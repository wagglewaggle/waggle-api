import { HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { config } from '@lib/config';
import ERROR_CODE from '../../app/exceptions/error-code';
import { ClientRequestException } from '../../app/exceptions/request.exception';
import { KakaoApiUrl } from '../auth.constant';
import { IKakaoInformationResponse, IKakaoTokenResponse } from '../auth.interface';
import { CallbackQueryDto } from '../auth.type';
import { BaseAuthService } from '../base-auth.service';
import { SnsType, UserStatus } from '@lib/entity/user/user.constant';
import { UserService } from '../../user/user.service';
import { UserEntity } from '../../user/entity/user.entity';
import { jwtSign } from '../../app/app.util';

@Injectable()
export class KakaoService extends BaseAuthService {
  constructor(readonly userService: UserService) {
    super(userService);
  }

  async callback(query: CallbackQueryDto): Promise<Record<string, any>> {
    const token = (await this.getToken(query.code)) as IKakaoTokenResponse;
    const userInformation = (await this.getInformation(token.access_token, 'Bearer')) as IKakaoInformationResponse;

    const user = new UserEntity({
      snsId: String(userInformation.id),
      snsType: SnsType.Kakao,
      email: userInformation.kakao_account.email,
      name: userInformation.kakao_account.profile.nickname,
      nickname: userInformation.kakao_account.profile.nickname,
      status: UserStatus.Activated,
    });
    if (!(await this.checkDuplicatedUser(String(userInformation.id), SnsType.Kakao))) {
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
      throw new ClientRequestException(ERROR_CODE.ERR_0000001, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
