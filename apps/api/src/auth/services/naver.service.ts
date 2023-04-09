import { HttpStatus, Injectable } from '@nestjs/common';
import { config } from '@lib/config';
import { IAuthCallbackResult } from '../auth.interface';
import { CallbackQueryDto } from '../auth.dto';
import { ClientRequestException } from '../../app/exceptions/request.exception';
import ERROR_CODE from '../../app/exceptions/error-code';
import axios, { AxiosError } from 'axios';
import { NaverApiUrl } from '../auth.constant';
import { BaseAuthService } from '../base-auth.service';
import { UserService } from '../../user/user.service';
import { SnsType, UserStatus } from '@lib/entity/user/user.constant';
import { jwtAccessTokenSign, jwtRefreshTokenSign } from '../../app/app.util';
import { UserRoleService } from '../../user-role/user-role.service';
import { DataSource, QueryRunner } from 'typeorm';
import { INaverInformationResponse, INaverTokenResponse } from '../auth-platform.interface';
import { UserTokenService } from '../../user-token/user-token.service';
import { UserTokenStatus } from '@lib/entity/user-token/user-token.constant';
import { TokenPayloadEntity } from '../../user-token/entity/token-payload.entity';

@Injectable()
export class NaverService extends BaseAuthService {
  constructor(
    readonly userService: UserService,
    readonly userRoleService: UserRoleService,
    readonly userTokenService: UserTokenService,
    readonly dataSource: DataSource,
  ) {
    super(userService, userRoleService);
  }

  async callback(query: CallbackQueryDto): Promise<IAuthCallbackResult> {
    const token = (await this.getToken(query.code)) as INaverTokenResponse;
    if (token.error) {
      throw new ClientRequestException(ERROR_CODE.ERR_0005001, HttpStatus.UNAUTHORIZED, token.error_description);
    }

    const userNaverInformation = (await this.getInformation(token.access_token, token.token_type)) as INaverInformationResponse;

    const isDuplicatedUser = await this.checkDuplicatedUser(userNaverInformation.response.id, SnsType.Naver);
    if (!isDuplicatedUser) {
      const newUser = this.userService.createInstance({
        snsId: userNaverInformation.response.id,
        snsType: SnsType.Naver,
        email: userNaverInformation.response.email,
        name: userNaverInformation.response.name,
        nickname: userNaverInformation.response.nickname,
        status: UserStatus.Activated,
      });

      await this.checkDuplicateNickname(newUser);
      await this.addNewUser(newUser);
    }

    const { payload, accessToken, refreshToken } = await this.createJwtUserToken(userNaverInformation.response.id);

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
      const user = await this.userService.getUserBySnsId(id, SnsType.Naver);
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

  protected async getToken(code: string): Promise<Record<string, any>> {
    try {
      const query = {
        client_id: config.naverClientId,
        client_secret: config.naverClientSecret,
        code,
        state: 'test',
      };
      const { data } = await axios.post(this.generateRequestUrl(NaverApiUrl.Token, query));
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new ClientRequestException(ERROR_CODE.ERR_0005001, HttpStatus.UNAUTHORIZED);
      }
      throw e;
    }
  }

  protected async getInformation(token: string, type: string): Promise<Record<string, any>> {
    try {
      const { data } = await axios.post(
        NaverApiUrl.Information,
        {},
        {
          headers: {
            Authorization: `${type} ${token}`,
          },
        },
      );
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new ClientRequestException(ERROR_CODE.ERR_0005001, HttpStatus.UNAUTHORIZED);
      }
      throw e;
    }
  }
}
