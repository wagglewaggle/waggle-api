import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import { RequestExtras } from '../interceptors/request-extras';
import { IRequestAugmented } from '../app.interface';

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  use(req: IRequestAugmented, res: Response, next: () => void): any {
    req.extras = new RequestExtras(req);
    next();
  }
}
