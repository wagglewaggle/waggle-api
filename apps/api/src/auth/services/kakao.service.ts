import { HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { config } from '@lib/config';
import ERROR_CODE from '../../app/exceptions/error-code';
import { ClientRequestException } from '../../app/exceptions/request.exception';
import { KakaoApiUrl } from '../auth.constant';
import { IAuthCallbackResult } from '../auth.interface';
import { CallbackQueryDto } from '../auth.type';
import { BaseAuthService } from '../base-auth.service';
import { SnsType, UserStatus } from '@lib/entity/user/user.constant';
import { UserService } from '../../user/user.service';
import { UserEntity } from '../../user/entity/user.entity';
import { jwtSign } from '../../app/app.util';
import { UserRoleService } from '../../user-role/user-role.service';
import { DataSource } from 'typeorm';
import { IKakaoInformationResponse, IKakaoTokenResponse } from '../auth-platform.interface';

@Injectable()
export class KakaoService extends BaseAuthService {
  constructor(readonly userService: UserService, readonly userRoleService: UserRoleService, readonly dataSource: DataSource) {
    super(userService, userRoleService);
  }

  async callback(query: CallbackQueryDto): Promise<IAuthCallbackResult> {
    const queryRunner = this.dataSource.createQueryRunner();
    const manager = queryRunner.manager;
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
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
      const isDuplicatedUser = await this.checkDuplicatedUser(String(userInformation.id), SnsType.Kakao);
      if (!isDuplicatedUser) {
        await this.addNewUser(user, manager);
      }

      const payload = { type: user.snsType, email: user.email, name: user.name, newUser: isDuplicatedUser };
      const jwtToken = await jwtSign(payload);

      await queryRunner.commitTransaction();
      return {
        token: jwtToken,
        payload,
      };
    } catch (e) {
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }
      throw new ClientRequestException(ERROR_CODE.ERR_0000001, HttpStatus.INTERNAL_SERVER_ERROR, { value: e });
    } finally {
      await queryRunner.release();
    }
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
