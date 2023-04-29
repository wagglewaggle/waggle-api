import { HttpStatus } from '@nestjs/common';
import { ClientRequestException } from '../../app/exceptions/request.exception';
import ERROR_CODE from '../../app/exceptions/error-code';
import { plainToInstance } from 'class-transformer';
import { User } from 'waggle-entity/dist/user/user.entity';
import { SnsType, UserStatus } from 'waggle-entity/dist/user/user.constant';
import { UserRole } from 'waggle-entity/dist/user-role/user-role.entity';

export class UserEntity extends User {
  readonly idx: number;
  readonly snsId: string;
  readonly snsType: SnsType;
  readonly email: string;
  readonly name: string;
  readonly nickname: string;
  readonly status: UserStatus;
  readonly userRole: UserRole;
  readonly createdDate: Date;
  readonly updatedDate: Date;

  constructor(user: User) {
    super();
    Object.assign(this, user);
  }

  toEntity(): User {
    return plainToInstance(User, this);
  }

  isActivated() {
    if (this.status === UserStatus.Deactivated) {
      throw new ClientRequestException(ERROR_CODE.ERR_0006002, HttpStatus.FORBIDDEN);
    }
    if (this.status === UserStatus.Locked) {
      throw new ClientRequestException(ERROR_CODE.ERR_0006011, HttpStatus.FORBIDDEN);
    }
  }

  modifyNickname(nickname: string) {
    Object.assign(this, { nickname });
  }
}
