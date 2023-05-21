import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { IRequestAugmented } from '../app.interface';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<IRequestAugmented>();

    const user = req.extras.getUser();
    user.isAdmin();

    return true;
  }
}
