import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiPath } from './auth.constant';
import { IAuthCallbackResult } from './auth.interface';
import { CallbackQueryDto, ReissueTokenBodyDto } from './auth.dto';
import { GoogleService } from './services/google.service';
import { KakaoService } from './services/kakao.service';
import { NaverService } from './services/naver.service';
import { UserTokenService } from '../user-token/user-token.service';
import { AppleService } from './services/apple.service';

@Controller(ApiPath.Root)
export class AuthController {
  constructor(
    private readonly naverService: NaverService,
    private readonly kakaoService: KakaoService,
    private readonly googleService: GoogleService,
    private readonly appleService: AppleService,
    private readonly userTokenService: UserTokenService,
  ) {}

  @Get(ApiPath.Naver)
  async naverRedirect(@Query() query: CallbackQueryDto): Promise<IAuthCallbackResult> {
    return await this.naverService.callback(query);
  }

  @Get(ApiPath.Kakao)
  async kakaoRedirect(@Query() query: CallbackQueryDto): Promise<IAuthCallbackResult> {
    return await this.kakaoService.callback(query);
  }

  @Get(ApiPath.Google)
  async googleRedirect(@Query() query: CallbackQueryDto): Promise<IAuthCallbackResult> {
    return await this.googleService.callback(query);
  }

  @Get(ApiPath.Apple)
  async appleRedirect(@Query() query: CallbackQueryDto): Promise<IAuthCallbackResult> {
    return await this.appleService.callback(query);
  }

  @Post(ApiPath.Reissue)
  async reissueAccessToken(@Body() body: ReissueTokenBodyDto) {
    const accessToken = await this.userTokenService.reissueAccessToken(body.refreshToken);
    return { accessToken };
  }
}
