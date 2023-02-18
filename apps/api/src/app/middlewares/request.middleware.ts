import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import { RequestExtras } from '../interceptors/request-extras';
import { IRequestAugmented, JwtUserPayload } from '../app.interface';
import { jwtVerify } from '../app.util';
import { UserService } from '../../user/user.service';
import { User } from '@lib/entity/user/user.entity';

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: IRequestAugmented, res: Response, next: () => void): Promise<any> {
    const payload = await this.parseJwt(req.headers.authorization);
    const user = await this.getUser(payload);

    req.extras = new RequestExtras({ payload, user });
    next();
  }

  async parseJwt(authorization: string | undefined): Promise<JwtUserPayload | undefined> {
    if (!authorization) {
      return undefined;
    }

    const token = authorization.replace('Bearer ', '');
    return await jwtVerify(token);
  }

  async getUser(payload: JwtUserPayload | undefined): Promise<User> {
    if (!payload) {
      return undefined;
    }

    return await this.userService.getUserById(payload.idx);
  }
}
