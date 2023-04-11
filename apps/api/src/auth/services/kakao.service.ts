import { HttpStatus, Injectable } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { config } from '@lib/config';
import ERROR_CODE from '../../app/exceptions/error-code';
import { ClientRequestException } from '../../app/exceptions/request.exception';
import { KakaoApiUrl } from '../auth.constant';
import { IAuthCallbackResult } from '../auth.interface';
import { CallbackQueryDto } from '../auth.dto';
import { BaseAuthService } from '../base-auth.service';
import { SnsType, UserStatus } from '@lib/entity/user/user.constant';
import { UserService } from '../../user/user.service';
import { jwtAccessTokenSign, jwtRefreshTokenSign } from '../../app/app.util';
import { UserRoleService } from '../../user-role/user-role.service';
import { DataSource, QueryRunner } from 'typeorm';
import { IKakaoInformationResponse, IKakaoTokenResponse } from '../auth-platform.interface';
import { UserTokenService } from '../../user-token/user-token.service';
import { UserTokenStatus } from '@lib/entity/user-token/user-token.constant';
import { TokenPayloadEntity } from '../../user-token/entity/token-payload.entity';

@Injectable()
export class KakaoService extends BaseAuthService {
  constructor(
    readonly userService: UserService,
    readonly userRoleService: UserRoleService,
    readonly userTokenService: UserTokenService,
    readonly dataSource: DataSource,
  ) {
    super(userService, userRoleService);
  }

  async callback(query: CallbackQueryDto): Promise<IAuthCallbackResult> {
    const token = (await this.getToken(query.code)) as IKakaoTokenResponse;
    const userInformation = (await this.getInformation(token.access_token, 'Bearer')) as IKakaoInformationResponse;

    const isDuplicatedUser = await this.checkDuplicatedUser(String(userInformation.id), SnsType.Kakao);
    if (!isDuplicatedUser) {
      const newUser = this.userService.createInstance({
        snsId: String(userInformation.id),
        snsType: SnsType.Kakao,
        nickname: userInformation.kakao_account.profile.nickname,
        status: UserStatus.Activated,
      });

      await this.checkDuplicateNickname(newUser);
      await this.addNewUser(newUser);
    }

    const { payload, accessToken, refreshToken } = await this.createJwtUserToken(String(userInformation.id));

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
      const user = await this.userService.getUserBySnsId(String(id), SnsType.Kakao);
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
        client_id: config.kakaoClientId,
        redirect_uri: config.kakaoRedirectUrl,
        code,
      };
      const { data } = await axios.post(this.generateRequestUrl(KakaoApiUrl.Token, query));
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new ClientRequestException(ERROR_CODE.ERR_0005002, HttpStatus.UNAUTHORIZED);
      }
      throw e;
    }
  }

  protected async getInformation(token: string, type: string): Promise<Record<string, any>> {
    try {
      const { data } = await axios.post(
        KakaoApiUrl.Information,
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
        throw new ClientRequestException(ERROR_CODE.ERR_0005002, HttpStatus.UNAUTHORIZED);
      }
      throw e;
    }
  }
}
