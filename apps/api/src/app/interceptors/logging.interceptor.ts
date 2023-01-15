import { CallHandler, ExecutionContext, HttpException, Injectable, InternalServerErrorException, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ClientRequestException } from '../exceptions/request.exception';
import { LoggerService } from '../logger/logger.service';
import { getClientIp } from 'request-ip';

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
        logObj.error = JSON.stringify(e);

        if (e instanceof ClientRequestException) {
          logObj.errorCode = e.message;
        }

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
}
