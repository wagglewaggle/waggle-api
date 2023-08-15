import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import ERROR_CODE from '../exceptions/error-code';
import errorMessage from '../exceptions/error-code/message.ko';
import { ClientRequestException } from '../exceptions/request.exception';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private statusCode: number;
  private stack: string | undefined;
  private data: any;

  constructor() {
    this.statusCode = 500;
    this.data = {
      errorCode: 'ERR_0000001',
      message: ERROR_CODE.ERR_0000001,
    };
  }

  catch(exception: unknown, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    if (exception instanceof ClientRequestException) {
      this.statusCode = exception.getStatus();
      this.data = {
        errorCode: this.getErrorCode(exception.message),
        message: exception.message,
      };
    } else if (exception instanceof InternalServerErrorException) {
    } else if (exception instanceof HttpException) {
      this.statusCode = exception.getStatus();
      this.data = {
        errorCode: 'ERR_0000003',
        message: ERROR_CODE.ERR_0000003,
      };
    }

    res.status(this.statusCode).json(this.data);
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
