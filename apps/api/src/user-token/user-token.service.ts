import { Injectable } from '@nestjs/common';
import { DeepPartial, EntityManager } from 'typeorm';
import { UserToken } from '@lib/entity/user-token/user-token.entity';
import { UserTokenRepository } from './user-token.repository';
import { UserTokenStatus } from '@lib/entity/user-token/user-token.constant';
import { UserTokenEntity } from './entity/user-token.entity';
import { UserEntity } from '../user/entity/user.entity';

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
}
