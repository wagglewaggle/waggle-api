import { HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { config } from '@lib/config';
import ERROR_CODE from '../../app/exceptions/error-code';
import { ClientRequestException } from '../../app/exceptions/request.exception';
import { GoogleApiUrl } from '../auth.constant';
import { IGoogleInformationResponse, IGoogleTokenResponse } from '../auth.interface';
import { CallbackQueryDto } from '../auth.type';
import { BaseAuthService } from '../base-auth.service';

@Injectable()
export class GoogleService extends BaseAuthService {
  async callback(query: CallbackQueryDto): Promise<any> {
    const token = (await this.getToken(query.code)) as IGoogleTokenResponse;
    const userInformation = (await this.getInformation(token.access_token, token.token_type)) as IGoogleInformationResponse;
    return userInformation;
  }

  async getToken(code: string): Promise<Record<string, any>> {
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

  async getInformation(token: string, type: string): Promise<Record<string, any>> {
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
