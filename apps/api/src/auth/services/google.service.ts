import { HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { config } from '../../../../../libs/config/src';
import ERROR_CODE from '../../app/exceptions/error-code';
import { ClientRequestException } from '../../app/exceptions/request.exception';
import { GoogleApiUrl } from '../auth.constant';
import { AuthInterface, IGoogleTokenResponse } from '../auth.interface';
import { CallbackQueryDto } from '../auth.type';

@Injectable()
export class GoogleService implements AuthInterface {
  async callback(query: CallbackQueryDto): Promise<any> {
    const token = (await this.getToken(query.code)) as IGoogleTokenResponse;
    const userInformation = await this.getInformation(token.access_token, token.token_type);
    return userInformation;
  }

  async getToken(code: string): Promise<Record<string, any>> {
    try {
      const { data } = await axios.post(
        `${GoogleApiUrl.Token}?` +
          `code=${code}&` +
          `client_id=${config.googleClientId}&` +
          `client_secret=${config.googleClientSecret}&` +
          `redirect_uri=${config.googleRedirectUrl}&` +
          `grant_type=authorization_code`,
      );
      return data;
    } catch (e) {
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
      throw new ClientRequestException(ERROR_CODE.ERR_0000001, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
