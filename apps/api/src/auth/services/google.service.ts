import { HttpStatus, Injectable } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { config } from '@lib/config';
import ERROR_CODE from '../../app/exceptions/error-code';
import { ClientRequestException } from '../../app/exceptions/request.exception';
import { GoogleApiUrl } from '../auth.constant';
import { IAuthCallbackResult } from '../auth.interface';
import { CallbackQueryDto } from '../auth.type';
import { BaseAuthService } from '../base-auth.service';
import { UserService } from '../../user/user.service';
import { SnsType, UserStatus } from '@lib/entity/user/user.constant';
import { jwtAccessTokenSign, jwtRefreshTokenSign } from '../../app/app.util';
import { UserRoleService } from '../../user-role/user-role.service';
import { DataSource, QueryRunner } from 'typeorm';
import { IGoogleInformationResponse, IGoogleTokenResponse } from '../auth-platform.interface';
import { UserTokenService } from '../../user-token/user-token.service';
import { UserTokenStatus } from '@lib/entity/user-token/user-token.constant';

@Injectable()
export class GoogleService extends BaseAuthService {
  constructor(
    readonly userService: UserService,
    readonly userRoleService: UserRoleService,
    readonly userTokenService: UserTokenService,
    readonly dataSource: DataSource,
  ) {
    super(userService, userRoleService);
  }

  async callback(query: CallbackQueryDto): Promise<IAuthCallbackResult> {
    const token = (await this.getToken(query.code)) as IGoogleTokenResponse;
    const userGoogleInformation = (await this.getInformation(token.access_token, token.token_type)) as IGoogleInformationResponse;

    const isDuplicatedUser = await this.checkDuplicatedUser(userGoogleInformation.id, SnsType.Google);
    if (!isDuplicatedUser) {
      await this.addNewUser(
        this.userService.createInstance({
          snsId: userGoogleInformation.id,
          snsType: SnsType.Google,
          email: userGoogleInformation.email,
          name: userGoogleInformation.name,
          nickname: userGoogleInformation.name,
          status: UserStatus.Activated,
        }),
      );
    }

    const { payload, accessToken, refreshToken } = await this.createJwtUserToken(userGoogleInformation.id);

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
      const user = await this.userService.getUserBySnsId(id, SnsType.Google);
      if (!user) {
        throw new ClientRequestException(ERROR_CODE.ERR_0006001, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      user.isActivated();

      const payload = { idx: user.idx, type: user.snsType, email: user.email, name: user.name };
      const accessToken = await jwtAccessTokenSign(payload);
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
        payload,
        accessToken,
        refreshToken,
      };
    } catch (e) {
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }
      throw new ClientRequestException(ERROR_CODE.ERR_0000001, HttpStatus.INTERNAL_SERVER_ERROR, e);
    } finally {
      await queryRunner.release();
    }
  }

  protected async getToken(code: string): Promise<Record<string, any>> {
    try {
      const query = {
        code,
        client_id: config.googleClientId,
        client_secret: config.googleClientSecret,
        redirect_uri: config.googleRedirectUrl,
      };
      const { data } = await axios.post(this.generateRequestUrl(GoogleApiUrl.Token, query));
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new ClientRequestException(ERROR_CODE.ERR_0005003, HttpStatus.UNAUTHORIZED);
      }
      throw new ClientRequestException(ERROR_CODE.ERR_0000001, HttpStatus.INTERNAL_SERVER_ERROR, e);
    }
  }

  protected async getInformation(token: string, type: string): Promise<Record<string, any>> {
    try {
      const { data } = await axios.get(GoogleApiUrl.Information, {
        headers: {
          authorization: `${type} ${token}`,
        },
      });
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new ClientRequestException(ERROR_CODE.ERR_0005003, HttpStatus.UNAUTHORIZED);
      }
      throw new ClientRequestException(ERROR_CODE.ERR_0000001, HttpStatus.INTERNAL_SERVER_ERROR, e);
    }
  }
}
