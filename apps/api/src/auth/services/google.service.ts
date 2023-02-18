import { HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { config } from '@lib/config';
import ERROR_CODE from '../../app/exceptions/error-code';
import { ClientRequestException } from '../../app/exceptions/request.exception';
import { GoogleApiUrl } from '../auth.constant';
import { IAuthCallbackResult } from '../auth.interface';
import { CallbackQueryDto } from '../auth.type';
import { BaseAuthService } from '../base-auth.service';
import { UserEntity } from '../../user/entity/user.entity';
import { UserService } from '../../user/user.service';
import { SnsType, UserStatus } from '@lib/entity/user/user.constant';
import { jwtSign } from '../../app/app.util';
import { UserRoleService } from '../../user-role/user-role.service';
import { DataSource } from 'typeorm';
import { IGoogleInformationResponse, IGoogleTokenResponse } from '../auth-platform.interface';

@Injectable()
export class GoogleService extends BaseAuthService {
  constructor(readonly userService: UserService, readonly userRoleService: UserRoleService, readonly dataSource: DataSource) {
    super(userService, userRoleService);
  }

  async callback(query: CallbackQueryDto): Promise<IAuthCallbackResult> {
    const queryRunner = this.dataSource.createQueryRunner();
    const manager = queryRunner.manager;
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
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
      const isDuplicatedUser = await this.checkDuplicatedUser(userGoogleInformation.id, SnsType.Google);
      if (!isDuplicatedUser) {
        await this.addNewUser(user, manager);
      }

      const payload = { type: user.snsType, email: user.email, name: user.name };
      const jwtToken = await jwtSign(payload);

      await queryRunner.commitTransaction();
      return {
        token: jwtToken,
        payload,
        newUser: isDuplicatedUser,
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
