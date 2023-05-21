import { HttpStatus, Injectable } from '@nestjs/common';
import { DeepPartial, EntityManager } from 'typeorm';
import { UserTokenRepository } from './user-token.repository';
import { UserTokenEntity } from './entity/user-token.entity';
import { UserEntity } from '../user/entity/user.entity';
import { ClientRequestException } from '../app/exceptions/request.exception';
import ERROR_CODE from '../app/exceptions/error-code';
import { TokenPayloadEntity } from './entity/token-payload.entity';
import { jwtAccessTokenSign, jwtVerify } from '../app/app.util';
import { UserToken } from 'waggle-entity/dist/user-token/user-token.entity';
import { UserTokenStatus } from 'waggle-entity/dist/user-token/user-token.constant';

@Injectable()
export class UserTokenService {
  constructor(private readonly userTokenRepository: UserTokenRepository) {}

  createInstance(userToken: DeepPartial<UserToken>): UserToken {
    return this.userTokenRepository.createInstance(userToken);
  }

  async getActivatedUserTokenByUser(user: UserEntity): Promise<UserTokenEntity | undefined> {
    return await this.userTokenRepository.getUserToken({ user: { idx: user.idx }, status: UserTokenStatus.Activated });
  }

  async getActivatedTokenByRefreshToken(token: string): Promise<UserTokenEntity | undefined> {
    return await this.userTokenRepository.getUserToken({ token, status: UserTokenStatus.Activated }, ['user']);
  }

  async addUserToken(userToken: UserToken, manager?: EntityManager) {
    await this.userTokenRepository.addUserToken(userToken, manager);
  }

  async modifyUserTokenStatus(idx: number, status: UserTokenStatus, manager?: EntityManager) {
    await this.userTokenRepository.updateUserToken({ idx }, { status, expiredDate: new Date() }, manager);
  }

  async reissueAccessToken(refreshToken: string): Promise<string> {
    const activatedRefreshToken = await this.getActivatedTokenByRefreshToken(refreshToken);
    if (!activatedRefreshToken) {
      throw new ClientRequestException(ERROR_CODE.ERR_0006008, HttpStatus.UNAUTHORIZED);
    }

    await jwtVerify(refreshToken);

    const payload = new TokenPayloadEntity(new UserEntity(activatedRefreshToken.user));
    return await jwtAccessTokenSign(payload.toJson());
  }

  async getActivatedUserTokenCount(): Promise<number> {
    return await this.userTokenRepository.getActivatedUserTokenCount();
  }
}
