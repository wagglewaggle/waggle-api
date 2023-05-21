import { Injectable } from '@nestjs/common';
import { DeepPartial, EntityManager } from 'typeorm';
import { UserRepository } from './user.repository';
import { UserEntity } from './entity/user.entity';
import { ModifyUserSettingBodyDto } from './user.interface';
import { User } from 'waggle-entity/dist/user/user.entity';
import { SnsType, UserStatus } from 'waggle-entity/dist/user/user.constant';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  createInstance(user: DeepPartial<User>) {
    return this.userRepository.createInstance(user);
  }

  async getUserById(idx: number): Promise<UserEntity | undefined> {
    const user = await this.userRepository.getUser({ idx }, ['userRole']);
    if (user) {
      return new UserEntity(user);
    }
    return undefined;
  }

  async getUserBySnsId(snsId: string, snsType: SnsType): Promise<UserEntity | undefined> {
    const user = await this.userRepository.getUser({ snsId, snsType }, ['userRole']);
    if (!user) {
      return undefined;
    }
    return new UserEntity(user);
  }

  async getUserByNickname(nickname: string): Promise<UserEntity | undefined> {
    const user = await this.userRepository.getUser({ nickname }, ['userRole']);
    if (!user) {
      return undefined;
    }
    return new UserEntity(user);
  }

  async addUser(user: UserEntity, manager?: EntityManager) {
    return await this.userRepository.addUser(user, manager);
  }

  async modifyUserSetting(user: UserEntity, body: ModifyUserSettingBodyDto) {
    await this.userRepository.modifyUser({ idx: user.idx }, body);
  }

  async modifyUserStatus(idx: number, status: UserStatus) {
    await this.userRepository.modifyUser({ idx }, { status });
  }

  async getActivatedUserCount(): Promise<number> {
    return await this.userRepository.getActivatedUserCount();
  }
}
