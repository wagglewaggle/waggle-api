import { HttpStatus, Injectable } from '@nestjs/common';
import { config } from '@lib/config';
import { AuthInterface, INaverTokenResponse } from '../auth.interface';
import { CallbackQueryDto } from '../auth.type';
import { ClientRequestException } from '../../app/exceptions/request.exception';
import ERROR_CODE from '../../app/exceptions/error-code';
import axios from 'axios';
import { NaverApiUrl } from '../auth.constant';

@Injectable()
export class NaverService implements AuthInterface {
  async callback(query: CallbackQueryDto): Promise<any> {
    if (query.error) {
      throw new ClientRequestException(ERROR_CODE.ERR_0005001, HttpStatus.BAD_REQUEST, { errorDesc: query.error_description });
    }

    const token = (await this.getToken(query.code)) as INaverTokenResponse;
    if (token.error) {
      throw new ClientRequestException(ERROR_CODE.ERR_0005001, HttpStatus.BAD_REQUEST, { errorDesc: token.error_description });
    }

    const userInformation = await this.getInformation(token.access_token, token.token_type);
    return userInformation;
  }

  async getToken(code: string): Promise<Record<string, any>> {
    try {
      const { data } = await axios.post(
        `${NaverApiUrl.Token}?` +
          `grant_type=authorization_code&` +
          `client_id=${config.naverClientId}&` +
          `client_secret=${config.naverClientSecret}&` +
          `code=${code}&` +
          `state=test`,
      );
      return data;
    } catch (e) {
      throw new ClientRequestException(ERROR_CODE.ERR_0000001, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getInformation(token: string, type: string): Promise<Record<string, any>> {
    try {
      const { data } = await axios.post(
        `${NaverApiUrl.Info}?`,
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
