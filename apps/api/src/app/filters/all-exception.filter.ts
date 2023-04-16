import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { ClientRequestException } from '../exceptions/request.exception';
import * as format from 'string-format';
import ERROR_CODE from '../exceptions/error-code';
import errorMessage from '../exceptions/error-code/message.ko';
import { config } from '@lib/config';
import { SentryService } from '../sentry/sentry.service';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly sentryService: SentryService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    let statusCode = 500;
    let stack: string | undefined;
    const sendData: any = {
      errorCode: 'ERR_0000001',
      message: ERROR_CODE.ERR_0000001,
      error: undefined,
    };

    if (exception instanceof ClientRequestException) {
      statusCode = exception.getStatus();
      stack = exception.stack;

      sendData.message = exception.getResponse();
      sendData.errorCode = this.getErrorCode(sendData.message);
      sendData.error = exception.value;

      if (sendData.error?.value) {
        sendData.message = format(sendData.message, sendData.error);
        sendData.error = undefined;
      }
    } else if (exception instanceof NotFoundException) {
      statusCode = HttpStatus.NOT_FOUND;
      stack = exception.stack;

      sendData.message = ERROR_CODE.ERR_0000002;
      sendData.errorCode = this.getErrorCode(sendData.message);
    } else if (exception instanceof HttpException) {
      const { message } = exception.getResponse() as any;

      statusCode = exception.getStatus();
      stack = exception.stack;

      if (Array.isArray(message)) {
        sendData.message = message[0];
      } else {
        sendData.message = message;
      }

      sendData.errorCode = 'ERR_0000003';
    }

    if (config.useSentry && statusCode === 500) {
      this.sentryService.sendError(sendData, stack);
    }

    return res.status(statusCode).json(sendData);
  }

  getErrorCode(message: string): string {
    const errorCodes = Object.keys(errorMessage);
    const result = errorCodes.find((code) => ERROR_CODE[code] === message);
    if (result) {
      return result;
    }
    throw new ClientRequestException(ERROR_CODE.ERR_0000001, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
