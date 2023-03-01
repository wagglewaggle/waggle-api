import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, InternalServerErrorException, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ClientRequestException } from '../exceptions/request.exception';
import { LoggerService } from '../logger/logger.service';
import { getClientIp } from 'request-ip';
import errorMessage from '../exceptions/error-code/message.ko';
import ERROR_CODE from '../exceptions/error-code';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly LOGGER_MESSAGE = 'clientRequest';

  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const http = context.switchToHttp();
    const req = http.getRequest<Request>();

    const logObj = {
      success: true,
      startTime: new Date().toISOString(),
      endTime: null,
      elapsedTime: null,
      clientIp: getClientIp(req),
      method: req.method,
      url: req.url,
      params: req.params,
      query: req.query,
      header: req.headers,
      body: req.body,
      error: null,
      errorCode: null,
      errorMessage: null,
    };

    return next.handle().pipe(
      tap(() => {
        logObj.success = true;
        this.calculateTimes(logObj);

        this.logger.log(this.LOGGER_MESSAGE, logObj);
      }),
      catchError((e) => {
        logObj.success = false;

        this.getErrorInfo(logObj, e);
        this.calculateTimes(logObj);
        this.logger.error(this.LOGGER_MESSAGE, logObj);

        return throwError(() => (e instanceof HttpException ? e : new InternalServerErrorException(e)));
      }),
    );
  }

  calculateTimes(target) {
    target.endTime = new Date().toISOString();
    target.elapsedTime = new Date(target.endTime).getTime() - new Date(target.startTime).getTime();
  }

  getErrorInfo(target, e) {
    target.error = JSON.stringify(e);

    if (e instanceof ClientRequestException) {
      target.errorMessage = e.message;
      target.errorCode = this.getErrorCode(e.message);
    }
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
