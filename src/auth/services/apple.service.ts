import { HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ClientRequestException } from '../../app/exceptions/request.exception';
import { UserRoleService } from '../../user-role/user-role.service';
import { UserTokenService } from '../../user-token/user-token.service';
import { UserService } from '../../user/user.service';
import { CallbackQueryDto } from '../auth.dto';
import { IAuthCallbackResult } from '../auth.interface';
import { BaseAuthService } from '../base-auth.service';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import { IAppleJwtPayload, IAppleTokenResponse } from '../auth-platform.interface';
import ERROR_CODE from '../../app/exceptions/error-code';
import { SnsType, UserStatus } from 'waggle-entity/dist/user/user.constant';
import { config } from '../../app/config/config.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const AppleAuth = require('apple-auth');

@Injectable()
export class AppleService extends BaseAuthService {
  constructor(
    readonly userService: UserService,
    readonly userRoleService: UserRoleService,
    readonly userTokenService: UserTokenService,
    readonly dataSource: DataSource,
  ) {
    super(userService, userRoleService, userTokenService, dataSource);
  }

  async callback(query: CallbackQueryDto): Promise<IAuthCallbackResult> {
    const token = await this.getToken(query.code);
    const appleJwtPayload = jwt.decode(token.id_token) as IAppleJwtPayload;
    const { sub, email } = appleJwtPayload;

    const isDuplicatedUser = await this.checkDuplicatedUser(sub as string, SnsType.Apple);
    if (!isDuplicatedUser) {
      const newUser = this.userService.createInstance({
        snsId: sub,
        snsType: SnsType.Apple,
        nickname: 'Apple_user', // TODO: 이름으로 변경
        status: UserStatus.Activated,
      });

      await this.checkDuplicateNickname(newUser);
      await this.addNewUser(newUser);
    }

    const { payload, accessToken, refreshToken } = await this.createJwtUserToken(sub as string, SnsType.Apple);

    return {
      accessToken,
      refreshToken,
      payload,
      existUser: isDuplicatedUser,
    };
  }

  protected async getToken(code: string): Promise<IAppleTokenResponse> {
    try {
      const privateKey = fs.readFileSync(`./${config.applePrivateKeyFile}`);
      const appleKey = {
        client_id: config.appleClientId,
        team_id: config.appleTeamId,
        key_id: config.appleKeyId,
        redirect_uri: config.appleRedirectUri,
        private_key_path: config.applePrivateKeyFile,
        scope: 'name',
      };

      const appleAuth = new AppleAuth(appleKey, privateKey.toString(), 'text');

      return await appleAuth.accessToken(code);
    } catch (e) {
      throw new ClientRequestException(ERROR_CODE.ERR_0005004, HttpStatus.UNAUTHORIZED, e);
    }
  }

  protected getInformation(): Promise<Record<string, any>> {
    throw new ClientRequestException(ERROR_CODE.ERR_0000001, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
