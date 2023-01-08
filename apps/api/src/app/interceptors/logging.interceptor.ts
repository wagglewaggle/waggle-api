import { CallHandler, ExecutionContext, HttpException, Injectable, InternalServerErrorException, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ClientRequestException } from '../exceptions/request.exception';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const http = context.switchToHttp();
    const req = http.getRequest<Request>();

    const logObj = {
      success: true,
      startTime: new Date().toISOString(),
      endTime: null,
      elapsedTime: null,
      clientIp: req.ip,
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

        console.log(JSON.stringify(logObj));
      }),
      catchError((e) => {
        logObj.success = false;
        logObj.error = JSON.stringify(e);

        if (e instanceof ClientRequestException) {
          logObj.errorCode = e.message;
        }

        this.calculateTimes(logObj);
        console.log(JSON.stringify(logObj));

        return throwError(() => (e instanceof HttpException ? e : new InternalServerErrorException(e)));
      }),
    );
  }

  calculateTimes(target) {
    target.endTime = new Date().toISOString();
    target.elapsedTime = new Date(target.endTime).getTime() - new Date(target.startTime).getTime();
  }
}
