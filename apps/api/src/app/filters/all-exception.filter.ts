import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { IRequestAugmented } from '../app.interface';
import { ClientRequestException } from '../exceptions/request.exception';
import * as format from 'string-format';
import ERROR_CODE from '../exceptions/error-code';
import errorMessage from '../exceptions/error-code/message.ko';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<IRequestAugmented>();
    const res = ctx.getResponse<Response>();

    let statusCode = 500;
    const sendData: any = {
      errorCode: 'ERR_0000001',
      message: ERROR_CODE.ERR_0000001,
      error: undefined,
    };

    if (exception instanceof ClientRequestException) {
      statusCode = exception.getStatus();
      sendData.message = exception.getResponse();
      sendData.errorCode = this.getErrorCode(sendData.message);
      sendData.error = exception.value;

      if (sendData.error?.value) {
        sendData.message = format(sendData.message, sendData.error);
        sendData.error = undefined;
      }
    } else if (exception instanceof NotFoundException) {
      statusCode = HttpStatus.NOT_FOUND;
      sendData.message = ERROR_CODE.ERR_0000002;
      sendData.errorCode = this.getErrorCode(sendData.message);
    }

    return res.status(statusCode).json(sendData);
  }

  getErrorCode(message: string): string {
    const errorCodes = Object.keys(errorMessage);
    return errorCodes.find((code) => ERROR_CODE[code] === message);
  }
}
