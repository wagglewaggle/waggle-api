import { HttpStatus, Injectable } from '@nestjs/common';
import { config } from '@lib/config';
import { INaverInformationResponse, INaverTokenResponse } from '../auth.interface';
import { CallbackQueryDto } from '../auth.type';
import { ClientRequestException } from '../../app/exceptions/request.exception';
import ERROR_CODE from '../../app/exceptions/error-code';
import axios from 'axios';
import { NaverApiUrl } from '../auth.constant';
import { BaseAuthService } from '../base-auth.service';
import { UserEntity } from '../../user/entity/user.entity';
import { UserService } from '../../user/user.service';
import { SnsType, UserStatus } from '@lib/entity/user/user.constant';
import { jwtSign } from '../../app/app.util';

@Injectable()
export class NaverService extends BaseAuthService {
  constructor(readonly userService: UserService) {
    super(userService);
  }

  async callback(query: CallbackQueryDto): Promise<Record<string, any>> {
    const token = (await this.getToken(query.code)) as INaverTokenResponse;
    if (token.error) {
      throw new ClientRequestException(ERROR_CODE.ERR_0005001, HttpStatus.BAD_REQUEST, { errorDesc: token.error_description });
    }

    const userNaverInformation = (await this.getInformation(token.access_token, token.token_type)) as INaverInformationResponse;

    const user = new UserEntity({
      snsId: userNaverInformation.response.id,
      snsType: SnsType.Naver,
      email: userNaverInformation.response.email,
      name: userNaverInformation.response.name,
      nickname: userNaverInformation.response.nickname,
      status: UserStatus.Activated,
    });
    if (!(await this.checkDuplicatedUser(userNaverInformation.response.id, SnsType.Naver))) {
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
        client_id: config.naverClientId,
        client_secret: config.naverClientSecret,
        code,
        state: 'test',
      };
      const { data } = await axios.post(this.generateRequestUrl(NaverApiUrl.Token, query));
      return data;
    } catch (e) {
      throw new ClientRequestException(ERROR_CODE.ERR_0000001, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  protected async getInformation(token: string, type: string): Promise<Record<string, any>> {
    try {
      const { data } = await axios.post(
        NaverApiUrl.Information,
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
