import { Controller, Get, Query } from '@nestjs/common';
import { ApiPath } from './auth.constant';
import { CallbackQueryDto } from './auth.type';
import { KakaoService } from './services/kakao.service';
import { NaverService } from './services/naver.service';

@Controller(ApiPath.Root)
export class AuthController {
  constructor(private readonly naverService: NaverService, private readonly kakaoService: KakaoService) {}

  @Get(`${ApiPath.Naver}/${ApiPath.Redirect}`)
  async naverRedirect(@Query() query: CallbackQueryDto) {
    return await this.naverService.callback(query);
  }

  @Get(`${ApiPath.Kakao}/${ApiPath.Redirect}`)
  async kakaoRedirect(@Query() query: CallbackQueryDto) {
    return await this.kakaoService.callback(query);
  }
}
