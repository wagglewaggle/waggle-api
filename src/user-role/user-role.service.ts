import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { UserRoleEntity } from './entity/user-role.entity';
import { UserRoleRepository } from './user-role.repository';

@Injectable()
export class UserRoleService {
  constructor(private readonly userRoleRepository: UserRoleRepository) {}

  async addUserRole(userRole: UserRoleEntity, manager?: EntityManager) {
    return await this.userRoleRepository.addUserRole(userRole, manager);
  }
}
