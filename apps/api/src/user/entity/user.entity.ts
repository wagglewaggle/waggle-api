import { User } from '@lib/entity/user/user.entity';
import { SnsType, UserStatus } from '@lib/entity/user/user.constant';

export class UserEntity extends User {
  readonly snsId: string;
  readonly snsType: SnsType;
  readonly email: string;
  readonly name: string;
  readonly nickname: string;
  readonly status: UserStatus;

  constructor({ snsId, snsType, email, name, nickname, status }) {
    super();
    this.snsId = snsId;
    this.snsType = snsType;
    this.email = email;
    this.name = name;
    this.nickname = nickname;
    this.status = status;
  }
}
