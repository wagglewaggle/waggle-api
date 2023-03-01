import { HttpStatus, Injectable } from '@nestjs/common';
import { DeepPartial, EntityManager } from 'typeorm';
import { SnsType, UserStatus } from '@lib/entity/user/user.constant';
import { UserRepository } from './user.repository';
import { User } from '@lib/entity/user/user.entity';
import { UserEntity } from './entity/user.entity';
import { ModifyUserSettingBodyDto } from './user.interface';
import { ClientRequestException } from '../app/exceptions/request.exception';
import ERROR_CODE from '../app/exceptions/error-code';

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

  async getUserBySnsId(snsId: string, snsType: SnsType): Promise<UserEntity> {
    const user = await this.userRepository.getUser({ snsId, snsType }, ['userRole']);
    if (!user) {
      throw new ClientRequestException(ERROR_CODE.ERR_0006001, HttpStatus.BAD_REQUEST);
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
}
