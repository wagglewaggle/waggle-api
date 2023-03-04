import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { IRequestAugmented } from '../app.interface';
import { jwtVerify } from '../app.util';
import ERROR_CODE from '../exceptions/error-code';
import { ClientRequestException } from '../exceptions/request.exception';

@Injectable()
export class UserGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<IRequestAugmented>();
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw new ClientRequestException(ERROR_CODE.ERR_0006006, HttpStatus.BAD_REQUEST);
    }

    const token = authorization.replace('Bearer ', '');
    await jwtVerify(token);

    const user = req.extras.getUser();
    if (!user) {
      throw new ClientRequestException(ERROR_CODE.ERR_0006001, HttpStatus.UNAUTHORIZED);
    }

    user.isActivated();

    return true;
  }
}
