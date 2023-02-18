import { HttpStatus, Injectable } from '@nestjs/common';
import { config } from '@lib/config';
import { IAuthCallbackResult } from '../auth.interface';
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
import { UserRoleService } from '../../user-role/user-role.service';
import { DataSource } from 'typeorm';
import { INaverInformationResponse, INaverTokenResponse } from '../auth-platform.interface';

@Injectable()
export class NaverService extends BaseAuthService {
  constructor(readonly userService: UserService, readonly userRoleService: UserRoleService, readonly dataSource: DataSource) {
    super(userService, userRoleService);
  }

  async callback(query: CallbackQueryDto): Promise<IAuthCallbackResult> {
    const queryRunner = this.dataSource.createQueryRunner();
    const manager = queryRunner.manager;
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
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
      const isDuplicatedUser = await this.checkDuplicatedUser(userNaverInformation.response.id, SnsType.Naver);
      if (!isDuplicatedUser) {
        await this.addNewUser(user, manager);
      }

      const payload = { type: user.snsType, email: user.email, name: user.name };
      const jwtToken = await jwtSign(payload);

      await queryRunner.commitTransaction();
      return {
        token: jwtToken,
        payload,
        existUser: isDuplicatedUser,
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
