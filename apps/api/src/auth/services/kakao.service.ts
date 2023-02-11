import { HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { config } from '@lib/config';
import ERROR_CODE from '../../app/exceptions/error-code';
import { ClientRequestException } from '../../app/exceptions/request.exception';
import { KakaoApiUrl } from '../auth.constant';
import { AuthInterface, IKakaoTokenResponse } from '../auth.interface';
import { CallbackQueryDto } from '../auth.type';

@Injectable()
export class KakaoService implements AuthInterface {
  async callback(query: CallbackQueryDto): Promise<any> {
    if (query.error) {
      throw new ClientRequestException(ERROR_CODE.ERR_0005002, HttpStatus.INTERNAL_SERVER_ERROR, { errorDesc: query.error_description });
    }

    const token = (await this.getToken(query.code)) as IKakaoTokenResponse;
    const userInformation = await this.getInformation(token.access_token, 'Bearer');
    return userInformation;
  }

  async getToken(code: string): Promise<Record<string, any>> {
    try {
      const { data } = await axios.post(
        `${KakaoApiUrl.Token}?` +
          'grant_type=authorization_code&' +
          `client_id=${config.kakaoClientId}&` +
          `redirect_uri=${config.kakaoRedirectUrl}&` +
          `code=${code}`,
      );
      return data;
    } catch (e) {
      throw new ClientRequestException(ERROR_CODE.ERR_0000001, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getInformation(token: string, type: string): Promise<Record<string, any>> {
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
      throw new ClientRequestException(ERROR_CODE.ERR_0000001, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
