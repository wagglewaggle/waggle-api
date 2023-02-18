import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@lib/entity/user/user.entity';
import { EntityManager, FindOptionsWhere, Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserRepository {
  constructor(@InjectRepository(User) private readonly repository: Repository<User>) {}

  createQueryBuilder(alias = 'user') {
    return this.repository.createQueryBuilder(alias);
  }

  async getUser(where: FindOptionsWhere<User>, relations?: string[]): Promise<User> {
    const options: any = { where };
    if (Array.isArray(relations)) {
      options.relations = relations;
    }
    return await this.repository.findOne(options);
  }

  async addUser(user: UserEntity, manager?: EntityManager) {
    if (manager) {
      return manager.save(User, user);
    }
    return this.repository.save(user);
  }
}
