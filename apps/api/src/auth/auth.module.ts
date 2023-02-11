import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleService } from './services/google.service';
import { KakaoService } from './services/kakao.service';
import { NaverService } from './services/naver.service';

@Module({
  providers: [NaverService, KakaoService, GoogleService],
  controllers: [AuthController],
})
export class AuthModule {}
