import { UserEntity } from '../../user/entity/user.entity';
import { IRequestExtraData, JwtUserPayload } from '../app.interface';

export class RequestExtras {
  private readonly payload: JwtUserPayload;
  private readonly user: UserEntity;

  constructor(data: IRequestExtraData) {
    this.payload = data.payload;
    this.user = data.user;
  }

  getUser(): UserEntity {
    return this.user;
  }

  getPayload(): JwtUserPayload {
    return this.payload;
  }
}
