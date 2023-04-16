import { HttpStatus, Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { ClientRequestException } from '../../app/exceptions/request.exception';
import { UserRoleService } from '../../user-role/user-role.service';
import { UserTokenService } from '../../user-token/user-token.service';
import { UserService } from '../../user/user.service';
import { CallbackQueryDto } from '../auth.dto';
import { IAuthCallbackResult } from '../auth.interface';
import { BaseAuthService } from '../base-auth.service';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import { SnsType, UserStatus } from '@lib/entity/user/user.constant';
import { config } from '@lib/config';
import { IAppleJwtPayload, IAppleTokenResponse } from '../auth-platform.interface';
import ERROR_CODE from '../../app/exceptions/error-code';
import { TokenPayloadEntity } from '../../user-token/entity/token-payload.entity';
import { jwtAccessTokenSign, jwtRefreshTokenSign } from '../../app/app.util';
import { UserTokenStatus } from '@lib/entity/user-token/user-token.constant';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const AppleAuth = require('apple-auth');

@Injectable()
export class AppleService extends BaseAuthService {
  constructor(
    readonly userService: UserService,
    readonly userRoleService: UserRoleService,
    readonly userTokenService: UserTokenService,
    readonly dataSource: DataSource,
  ) {
    super(userService, userRoleService);
  }

  async callback(query: CallbackQueryDto): Promise<IAuthCallbackResult> {
    const token = await this.getToken(query.code);
    const appleJwtPayload = jwt.decode(token.id_token) as IAppleJwtPayload;
    const { sub, email } = appleJwtPayload;

    const isDuplicatedUser = await this.checkDuplicatedUser(sub as string, SnsType.Apple);
    if (!isDuplicatedUser) {
      const newUser = this.userService.createInstance({
        snsId: sub,
        snsType: SnsType.Apple,
        nickname: email.split('@')[0],
        status: UserStatus.Activated,
      });

      await this.checkDuplicateNickname(newUser);
      await this.addNewUser(newUser);
    }

    const { payload, accessToken, refreshToken } = await this.createJwtUserToken(sub as string);

    return {
      accessToken,
      refreshToken,
      payload,
      existUser: isDuplicatedUser,
    };
  }

  protected async createJwtUserToken(id: string): Promise<any> {
    const connection = this.dataSource;
    const queryRunner: QueryRunner = connection.createQueryRunner();
    const manager = queryRunner.manager;
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const user = await this.userService.getUserBySnsId(id, SnsType.Apple);
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

  protected async getToken(code: string): Promise<IAppleTokenResponse> {
    try {
      const privateKey = fs.readFileSync(`./${config.applePrivateKeyFile}`);
      const appleKey = {
        client_id: config.appleClientId,
        team_id: config.appleTeamId,
        key_id: config.appleKeyId,
        redirect_uri: config.appleRedirectUri,
        private_key_path: config.applePrivateKeyFile,
        scope: 'name%20email',
      };

      const appleAuth = new AppleAuth(appleKey, privateKey.toString(), 'text');

      return await appleAuth.accessToken(code);
    } catch (e) {
      throw e;
    }
  }

  protected getInformation(token: string, type: string): Promise<Record<string, any>> {
    throw new ClientRequestException(ERROR_CODE.ERR_0000001, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
