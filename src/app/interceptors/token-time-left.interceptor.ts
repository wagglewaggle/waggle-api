import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { IRequestAugmented } from '../app.interface';
import { jwtTokenTimeLeft } from '../app.util';

@Injectable()
export class TokenTimeLeftInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    const http = context.switchToHttp();
    const req = http.getRequest<IRequestAugmented>();

    const payload = req.extras.getPayload();
    if (!payload) {
      return next.handle().pipe(map((data) => ({ ...data })));
    }

    const tokenTimeLeft = await jwtTokenTimeLeft(payload);

    return next.handle().pipe(
      map((data) => ({
        ...data,
        tokenTimeLeft,
      })),
    );
  }
}
