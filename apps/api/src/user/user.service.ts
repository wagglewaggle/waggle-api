import { Injectable } from '@nestjs/common';
import { User } from '@sentry/node';
import { EntityManager } from 'typeorm';
import { SnsType } from '../../../../libs/entity/src/user/user.constant';
import { UserEntity } from './entity/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserBySnsId(snsId: string, snsType: SnsType): Promise<User> {
    return await this.userRepository.getUser({ snsId, snsType });
  }

  async addUser(user: UserEntity, manager?: EntityManager) {
    await this.userRepository.addUser(user, manager);
  }
}
