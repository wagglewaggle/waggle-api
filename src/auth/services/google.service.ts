import { HttpStatus, Injectable } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import ERROR_CODE from '../../app/exceptions/error-code';
import { ClientRequestException } from '../../app/exceptions/request.exception';
import { GoogleApiUrl } from '../auth.constant';
import { IAuthCallbackResult } from '../auth.interface';
import { CallbackQueryDto } from '../auth.dto';
import { BaseAuthService } from '../base-auth.service';
import { UserService } from '../../user/user.service';
import { UserRoleService } from '../../user-role/user-role.service';
import { DataSource } from 'typeorm';
import { IGoogleInformationResponse, IGoogleTokenResponse } from '../auth-platform.interface';
import { UserTokenService } from '../../user-token/user-token.service';
import { UserStatus } from 'waggle-entity/dist/user/user.constant';
import { SnsType } from 'waggle-entity/dist/user/user.constant';
import { config } from '../../app/config/config.service';

@Injectable()
export class GoogleService extends BaseAuthService {
  constructor(
    readonly userService: UserService,
    readonly userRoleService: UserRoleService,
    readonly userTokenService: UserTokenService,
    readonly dataSource: DataSource,
  ) {
    super(userService, userRoleService, userTokenService, dataSource);
  }

  async callback(query: CallbackQueryDto): Promise<IAuthCallbackResult> {
    const token = (await this.getToken(query.code)) as IGoogleTokenResponse;
    const userGoogleInformation = (await this.getInformation(token.access_token, token.token_type)) as IGoogleInformationResponse;

    const isDuplicatedUser = await this.checkDuplicatedUser(userGoogleInformation.id, SnsType.Google);
    if (!isDuplicatedUser) {
      const newUser = this.userService.createInstance({
        snsId: userGoogleInformation.id,
        snsType: SnsType.Google,
        nickname: userGoogleInformation.name,
        status: UserStatus.Activated,
      });

      await this.checkDuplicateNickname(newUser);
      await this.addNewUser(newUser);
    }

    const { payload, accessToken, refreshToken } = await this.createJwtUserToken(userGoogleInformation.id, SnsType.Google);

    return {
      accessToken,
      refreshToken,
      payload,
      existUser: isDuplicatedUser,
    };
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
      throw e;
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
      throw e;
    }
  }
}
