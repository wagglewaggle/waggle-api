import { HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { config } from '@lib/config';
import ERROR_CODE from '../../app/exceptions/error-code';
import { ClientRequestException } from '../../app/exceptions/request.exception';
import { KakaoApiUrl } from '../auth.constant';
import { IKakaoInformationResponse, IKakaoTokenResponse } from '../auth.interface';
import { CallbackQueryDto } from '../auth.type';
import { BaseAuthService } from '../base-auth.service';

@Injectable()
export class KakaoService extends BaseAuthService {
  async callback(query: CallbackQueryDto): Promise<any> {
    if (query.error) {
      throw new ClientRequestException(ERROR_CODE.ERR_0005002, HttpStatus.INTERNAL_SERVER_ERROR, { value: query.error_description });
    }

    const token = (await this.getToken(query.code)) as IKakaoTokenResponse;
    const userInformation = (await this.getInformation(token.access_token, 'Bearer')) as IKakaoInformationResponse;
    return userInformation;
  }

  async getToken(code: string): Promise<Record<string, any>> {
    try {
      const query = {
        client_id: config.kakaoClientId,
        redirect_uri: config.kakaoRedirectUrl,
        code,
      };
      const { data } = await axios.post(this.generateRequestUrl(KakaoApiUrl.Token, query));
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
