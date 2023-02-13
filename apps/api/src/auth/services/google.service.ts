import { HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { config } from '@lib/config';
import ERROR_CODE from '../../app/exceptions/error-code';
import { ClientRequestException } from '../../app/exceptions/request.exception';
import { GoogleApiUrl } from '../auth.constant';
import { IGoogleInformationResponse, IGoogleTokenResponse } from '../auth.interface';
import { CallbackQueryDto } from '../auth.type';
import { BaseAuthService } from '../base-auth.service';
import { UserEntity } from '../../user/entity/user.entity';
import { UserService } from '../../user/user.service';
import { SnsType, UserStatus } from '@lib/entity/user/user.constant';
import { jwtSign } from '../../app/app.util';

@Injectable()
export class GoogleService extends BaseAuthService {
  constructor(readonly userService: UserService) {
    super(userService);
  }

  async callback(query: CallbackQueryDto): Promise<Record<string, any>> {
    const token = (await this.getToken(query.code)) as IGoogleTokenResponse;
    const userGoogleInformation = (await this.getInformation(token.access_token, token.token_type)) as IGoogleInformationResponse;

    const user = new UserEntity({
      snsId: userGoogleInformation.id,
      snsType: SnsType.Google,
      email: userGoogleInformation.email,
      name: userGoogleInformation.name,
      nickname: userGoogleInformation.name,
      status: UserStatus.Activated,
    });
    if (!(await this.checkDuplicatedUser(userGoogleInformation.id, SnsType.Google))) {
      await this.addNewUser(user);
    }

    const payload = { type: user.snsType, email: user.email, name: user.name };
    const jwtToken = await jwtSign(payload);
    return {
      token: jwtToken,
      payload,
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
      console.log(e);
      throw new ClientRequestException(ERROR_CODE.ERR_0000001, HttpStatus.INTERNAL_SERVER_ERROR);
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
      console.log(e.data);
      throw new ClientRequestException(ERROR_CODE.ERR_0000001, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
