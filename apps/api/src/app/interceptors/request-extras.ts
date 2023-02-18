import { User } from '@lib/entity/user/user.entity';
import { IRequestExtraData, JwtUserPayload } from '../app.interface';

export class RequestExtras {
  private readonly payload: JwtUserPayload;
  private readonly user: User;

  constructor(data: IRequestExtraData) {
    this.payload = data.payload;
    this.user = data.user;
  }

  getUser(): User {
    return this.user;
  }

  getPayload(): JwtUserPayload {
    return this.payload;
  }
}
