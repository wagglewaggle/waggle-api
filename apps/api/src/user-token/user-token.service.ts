import { HttpStatus, Injectable } from '@nestjs/common';
import { DeepPartial, EntityManager } from 'typeorm';
import { UserToken } from '@lib/entity/user-token/user-token.entity';
import { UserTokenRepository } from './user-token.repository';
import { UserTokenStatus } from '@lib/entity/user-token/user-token.constant';
import { UserTokenEntity } from './entity/user-token.entity';
import { UserEntity } from '../user/entity/user.entity';
import { ClientRequestException } from '../app/exceptions/request.exception';
import ERROR_CODE from '../app/exceptions/error-code';
import { TokenPayloadEntity } from './entity/token-payload.entity';
import { jwtAccessTokenSign } from '../app/app.util';

@Injectable()
export class UserTokenService {
  constructor(private readonly userTokenRepository: UserTokenRepository) {}

  createInstance(userToken: DeepPartial<UserToken>): UserToken {
    return this.userTokenRepository.createInstance(userToken);
  }

  async getActivatedUserTokenByUser(user: UserEntity): Promise<UserTokenEntity | undefined> {
    return await this.userTokenRepository.getUserToken({ user: { idx: user.idx }, status: UserTokenStatus.Activated });
  }

  async addUserToken(userToken: UserToken, manager?: EntityManager) {
    await this.userTokenRepository.addUserToken(userToken, manager);
  }

  async modifyUserTokenStatus(idx: number, status: UserTokenStatus, manager?: EntityManager) {
    await this.userTokenRepository.updateUserToken({ idx }, { status, expiredDate: new Date() }, manager);
  }

  async reissueAccessToken(user: UserEntity, refreshToken: string): Promise<string> {
    const activatedRefreshToken = await this.getActivatedUserTokenByUser(user);
    if (!activatedRefreshToken) {
      throw new ClientRequestException(ERROR_CODE.ERR_0006008, HttpStatus.UNAUTHORIZED);
    }

    if (activatedRefreshToken.token !== refreshToken) {
      throw new ClientRequestException(ERROR_CODE.ERR_0006009, HttpStatus.UNAUTHORIZED);
    }

    const payload = new TokenPayloadEntity(user);
    return await jwtAccessTokenSign(payload.toJson());
  }
}
