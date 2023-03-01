import { HttpStatus } from '@nestjs/common';
import { UserEntity } from '../../user/entity/user.entity';
import { IRequestExtraData, JwtUserPayload } from '../app.interface';
import ERROR_CODE from '../exceptions/error-code';
import { ClientRequestException } from '../exceptions/request.exception';

export class RequestExtras {
  private readonly payload?: JwtUserPayload;
  private readonly user?: UserEntity;

  constructor(data: IRequestExtraData) {
    this.payload = data.payload;
    this.user = data.user;
  }

  getUser(): UserEntity {
    if (!this.user) {
      throw new ClientRequestException(ERROR_CODE.ERR_0006001, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return this.user;
  }

  getPayload(): JwtUserPayload | undefined {
    return this.payload;
  }
}
