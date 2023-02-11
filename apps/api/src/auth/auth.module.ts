import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { NaverService } from './services/naver.service';

@Module({
  providers: [AuthService, NaverService],
  controllers: [AuthController],
})
export class AuthModule {}
