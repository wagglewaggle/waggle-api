import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { KakaoService } from './services/kakao.service';
import { NaverService } from './services/naver.service';

@Module({
  providers: [NaverService, KakaoService],
  controllers: [AuthController],
})
export class AuthModule {}
