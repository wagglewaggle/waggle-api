import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { UserRole } from '@lib/entity/user-role/user-role.entity';
import { UserRoleEntity } from './entity/user-role.entity';

@Injectable()
export class UserRoleRepository {
  constructor(@InjectRepository(UserRole) private readonly repository: Repository<UserRole>) {}

  async addUserRole(userRole: UserRoleEntity, manager?: EntityManager) {
    if (manager) {
      return await manager.save(UserRole, userRole);
    }
    return await this.repository.save(userRole);
  }
}
