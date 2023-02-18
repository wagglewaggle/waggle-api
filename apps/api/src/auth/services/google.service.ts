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
import { jwtSign } from '../../app/app.util';
import { UserRoleService } from '../../user-role/user-role.service';
import { DataSource } from 'typeorm';
import { IGoogleInformationResponse, IGoogleTokenResponse } from '../auth-platform.interface';

@Injectable()
export class GoogleService extends BaseAuthService {
  constructor(readonly userService: UserService, readonly userRoleService: UserRoleService, readonly dataSource: DataSource) {
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

    const user = await this.userService.getUserBySnsId(userGoogleInformation.id, SnsType.Google);
    user.isActivated();

    const payload = { type: user.snsType, email: user.email, name: user.name };
    const jwtToken = await jwtSign(payload);

    return {
      token: jwtToken,
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
