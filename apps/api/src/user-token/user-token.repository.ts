import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, EntityManager, FindOptionsWhere, Repository } from 'typeorm';
import { UserToken } from '@lib/entity/user-token/user-token.entity';
import { UserTokenEntity } from './entity/user-token.entity';

@Injectable()
export class UserTokenRepository {
  constructor(@InjectRepository(UserToken) private readonly repository: Repository<UserToken>) {}

  createInstance(userToken: DeepPartial<UserToken>): UserToken {
    return this.repository.create(userToken);
  }

  async getUserToken(where: FindOptionsWhere<UserToken>, relations?: string[]): Promise<UserTokenEntity | undefined> {
    const options: any = { where };
    if (Array.isArray(relations)) {
      options.relations = relations;
    }
    const token = await this.repository.findOne(options);
    if (!token) {
      return undefined;
    }
    return new UserTokenEntity(token);
  }

  async addUserToken(userToken: UserToken, manager?: EntityManager) {
    if (manager) {
      return manager.save(UserToken, userToken);
    }
    return this.repository.save(userToken);
  }

  async updateUserToken(where: Partial<UserToken>, set: Partial<UserToken>, manager?: EntityManager) {
    if (manager) {
      return manager.update(UserToken, where, set);
    }
    return this.repository.update(where, set);
  }
}
