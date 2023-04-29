import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, EntityManager, FindOptionsWhere, Repository } from 'typeorm';
import { User } from 'waggle-entity/dist/user/user.entity';
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

  async modifyUser(where: Partial<User>, set: Partial<User>, manager?: EntityManager) {
    if (manager) {
      return manager.update(User, where, set);
    }
    return this.repository.update(where, set);
  }
}
