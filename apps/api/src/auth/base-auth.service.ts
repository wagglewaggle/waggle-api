import { CallbackQueryDto } from './auth.type';
import * as format from 'string-format';
import { UserEntity } from '../user/entity/user.entity';
import { SnsType } from '@lib/entity/user/user.constant';
import { UserService } from '../user/user.service';
import { UserRoleService } from '../user-role/user-role.service';
import { EntityManager } from 'typeorm';
import { UserRoleEntity } from '../user-role/entity/user-role.entity';
import { UserRoleType } from '@lib/entity/user-role/user-role.constant';
import { IAuthCallbackResult } from './auth.interface';

export abstract class BaseAuthService {
  readonly userService: UserService;
  readonly userRoleService: UserRoleService;

  constructor(userService: UserService, userRoleService: UserRoleService) {
    this.userService = userService;
    this.userRoleService = userRoleService;
  }

  abstract callback(query: CallbackQueryDto): Promise<IAuthCallbackResult>;
  protected abstract getToken(code: string): Promise<Record<string, any>>;
  protected abstract getInformation(token: string, type: string): Promise<Record<string, any>>;
  protected abstract createJwtUserToken(id: string): Promise<any>;

  generateRequestUrl(url: string, data: Record<string, any> = {}): string {
    return format(url, data);
  }

  async checkDuplicatedUser(snsId: string, snsType: SnsType): Promise<boolean> {
    if (await this.userService.getUserBySnsId(snsId, snsType)) {
      return true;
    }
    return false;
  }

  async addNewUser(userEntity: UserEntity, manager?: EntityManager): Promise<void> {
    const user = await this.userService.addUser(userEntity, manager);
    await this.userRoleService.addUserRole(new UserRoleEntity({ user, role: UserRoleType.Normal }), manager);
  }
}
