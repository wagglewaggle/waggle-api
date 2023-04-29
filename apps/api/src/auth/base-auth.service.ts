import { CallbackQueryDto } from './auth.dto';
import * as format from 'string-format';
import { UserEntity } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import { UserRoleService } from '../user-role/user-role.service';
import { DataSource, EntityManager, QueryRunner } from 'typeorm';
import { UserRoleEntity } from '../user-role/entity/user-role.entity';
import { IAuthCallbackResult } from './auth.interface';
import { ClientRequestException } from '../app/exceptions/request.exception';
import ERROR_CODE from '../app/exceptions/error-code';
import { HttpStatus } from '@nestjs/common';
import { TokenPayloadEntity } from '../user-token/entity/token-payload.entity';
import { jwtAccessTokenSign, jwtRefreshTokenSign } from '../app/app.util';
import { UserTokenService } from '../user-token/user-token.service';
import { SnsType } from 'waggle-entity/dist/user/user.constant';
import { UserTokenStatus } from 'waggle-entity/dist/user-token/user-token.constant';
import { UserRoleType } from 'waggle-entity/dist/user-role/user-role.constant';

export abstract class BaseAuthService {
  readonly userService: UserService;
  readonly userRoleService: UserRoleService;
  readonly userTokenService: UserTokenService;
  readonly dataSource: DataSource;

  constructor(userService: UserService, userRoleService: UserRoleService, userTokenService: UserTokenService, dataSource: DataSource) {
    this.userService = userService;
    this.userRoleService = userRoleService;
    this.userTokenService = userTokenService;
    this.dataSource = dataSource;
  }

  abstract callback(query: CallbackQueryDto): Promise<IAuthCallbackResult>;
  protected abstract getToken(code: string): Promise<Record<string, any>>;
  protected abstract getInformation(token: string, type: string): Promise<Record<string, any>>;

  protected async createJwtUserToken(id: string, snsType: SnsType): Promise<any> {
    const connection = this.dataSource;
    const queryRunner: QueryRunner = connection.createQueryRunner();
    const manager = queryRunner.manager;
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const user = await this.userService.getUserBySnsId(id, snsType);
      if (!user) {
        throw new ClientRequestException(ERROR_CODE.ERR_0006001, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      user.isActivated();

      const payload = new TokenPayloadEntity(user);
      const accessToken = await jwtAccessTokenSign(payload.toJson());
      const refreshToken = await jwtRefreshTokenSign({ idx: user.idx });

      const existRefreshToken = await this.userTokenService.getActivatedUserTokenByUser(user);
      if (existRefreshToken) {
        if (existRefreshToken.isActivated()) {
          await this.userTokenService.modifyUserTokenStatus(existRefreshToken.idx, UserTokenStatus.IntentionalExpired, manager);
        }
      }

      const userToken = this.userTokenService.createInstance({ token: refreshToken, status: UserTokenStatus.Activated, user });
      await this.userTokenService.addUserToken(userToken, manager);
      await queryRunner.commitTransaction();
      return {
        payload: payload.toJson(),
        accessToken,
        refreshToken,
      };
    } catch (e) {
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }
      throw e;
    } finally {
      await queryRunner.release();
    }
  }

  generateRequestUrl(url: string, data: Record<string, any> = {}): string {
    return format(url, data);
  }

  async checkDuplicatedUser(snsId: string, snsType: SnsType): Promise<boolean> {
    if (await this.userService.getUserBySnsId(snsId, snsType)) {
      return true;
    }
    return false;
  }

  async checkDuplicateNickname(newUser: UserEntity): Promise<UserEntity> {
    const isDuplicate = await this.userService.getUserByNickname(newUser.nickname);
    if (isDuplicate) {
      const date = new Date();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();
      newUser.modifyNickname(`${newUser.nickname}_${month}${day}${hour}${minute}${second}`);
    }
    return newUser;
  }

  async addNewUser(userEntity: UserEntity, manager?: EntityManager): Promise<void> {
    const user = await this.userService.addUser(userEntity, manager);
    await this.userRoleService.addUserRole(new UserRoleEntity({ user, role: UserRoleType.Normal }), manager);
  }
}
