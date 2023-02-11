import { Controller, Get, Query } from '@nestjs/common';
import { ApiPath } from './auth.constant';
import { CallbackQueryDto } from './auth.type';
import { NaverService } from './services/naver.service';

@Controller(ApiPath.Root)
export class AuthController {
  constructor(private readonly naverService: NaverService) {}

  @Get(`${ApiPath.Naver}/${ApiPath.Redirect}`)
  async naverRedirect(@Query() query: CallbackQueryDto) {
    return await this.naverService.callback(query);
  }
}
