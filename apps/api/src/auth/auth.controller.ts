import { Controller, Get, Query } from '@nestjs/common';
import { ApiPath } from './auth.constant';
import { CallbackQueryDto } from './auth.type';
import { GoogleService } from './services/google.service';
import { KakaoService } from './services/kakao.service';
import { NaverService } from './services/naver.service';

@Controller(ApiPath.Root)
export class AuthController {
  constructor(
    private readonly naverService: NaverService,
    private readonly kakaoService: KakaoService,
    private readonly googleService: GoogleService,
  ) {}

  @Get(ApiPath.Naver)
  async naverRedirect(@Query() query: CallbackQueryDto) {
    return await this.naverService.callback(query);
  }

  @Get(ApiPath.Kakao)
  async kakaoRedirect(@Query() query: CallbackQueryDto) {
    return await this.kakaoService.callback(query);
  }

  @Get(ApiPath.Google)
  async googleRedirect(@Query() query: CallbackQueryDto) {
    return await this.googleService.callback(query);
  }
}
