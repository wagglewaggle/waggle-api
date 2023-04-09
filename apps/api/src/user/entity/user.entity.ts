import { User } from '@lib/entity/user/user.entity';
import { SnsType, UserStatus } from '@lib/entity/user/user.constant';
import { UserRole } from '@lib/entity/user-role/user-role.entity';
import { HttpStatus } from '@nestjs/common';
import { ClientRequestException } from '../../app/exceptions/request.exception';
import ERROR_CODE from '../../app/exceptions/error-code';
import { plainToInstance } from 'class-transformer';

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
    if ([UserStatus.Deactivated, UserStatus.Locked].includes(this.status)) {
      throw new ClientRequestException(ERROR_CODE.ERR_0006002, HttpStatus.UNAUTHORIZED);
    }
  }

  modifyNickname(nickname: string) {
    Object.assign(this, { nickname });
  }
}
