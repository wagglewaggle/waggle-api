import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@lib/entity/user/user.entity';
import { DeepPartial, EntityManager, FindOptionsWhere, Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserRepository {
  constructor(@InjectRepository(User) private readonly repository: Repository<User>) {}

  createInstance(user: DeepPartial<User>): UserEntity {
    return new UserEntity(this.repository.create(user));
  }

  createQueryBuilder(alias = 'user') {
    return this.repository.createQueryBuilder(alias);
  }

  async getUser(where: FindOptionsWhere<User>, relations?: string[]): Promise<User | undefined> {
    const options: any = { where };
    if (Array.isArray(relations)) {
      options.relations = relations;
    }
    const user = await this.repository.findOne(options);
    return user || undefined;
  }

  async addUser(user: UserEntity, manager?: EntityManager) {
    if (manager) {
      return manager.save(User, user);
    }
    return this.repository.save(user);
  }
}
