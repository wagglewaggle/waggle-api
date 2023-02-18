import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { SnsType } from '@lib/entity/user/user.constant';
import { UserEntity } from './entity/user.entity';
import { UserRepository } from './user.repository';
import { User } from '@lib/entity/user/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(idx: number): Promise<User> {
    return await this.userRepository.getUser({ idx });
  }

  async getUserBySnsId(snsId: string, snsType: SnsType): Promise<User> {
    return await this.userRepository.getUser({ snsId, snsType });
  }

  async addUser(user: UserEntity, manager?: EntityManager) {
    return await this.userRepository.addUser(user, manager);
  }
}
