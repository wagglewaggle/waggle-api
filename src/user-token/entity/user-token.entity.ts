import { UserTokenStatus } from 'waggle-entity/dist/user-token/user-token.constant';
import { UserToken } from 'waggle-entity/dist/user-token/user-token.entity';
import { User } from 'waggle-entity/dist/user/user.entity';

export class UserTokenEntity extends UserToken {
  readonly idx: number;
  readonly token: string;
  readonly status: UserTokenStatus;
  readonly createdDate: Date;
  readonly expiredDate: Date;
  readonly user: User;

  constructor(userToken: UserToken) {
    super();
    Object.assign(this, userToken);
  }

  isActivated(): boolean {
    return this.status === UserTokenStatus.Activated;
  }
}
