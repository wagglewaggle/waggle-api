import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { NaverService } from './services/naver.service';

@Module({
  providers: [NaverService],
  controllers: [AuthController],
})
export class AuthModule {}
