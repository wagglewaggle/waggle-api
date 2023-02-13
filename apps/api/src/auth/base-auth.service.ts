import { CallbackQueryDto } from './auth.type';
import * as format from 'string-format';
import { UserEntity } from '../user/entity/user.entity';
import { SnsType } from '@lib/entity/user/user.constant';
import { UserService } from '../user/user.service';

export abstract class BaseAuthService {
  readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  abstract callback(query: CallbackQueryDto): Promise<Record<string, any>>;
  protected abstract getToken(code: string): Promise<Record<string, any>>;
  protected abstract getInformation(token: string, type: string): Promise<Record<string, any>>;

  generateRequestUrl(url: string, data?: Record<string, any>): string {
    return format(url, data);
  }

  async checkDuplicatedUser(snsId: string, snsType: SnsType): Promise<boolean> {
    if (await this.userService.getUserBySnsId(snsId, snsType)) {
      return true;
    }
    return false;
  }

  async addNewUser(user: UserEntity): Promise<void> {
    await this.userService.addUser(user);
  }
}
