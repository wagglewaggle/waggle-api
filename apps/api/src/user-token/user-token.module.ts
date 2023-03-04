import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserToken } from '@lib/entity/user-token/user-token.entity';
import { UserTokenService } from './user-token.service';
import { UserTokenRepository } from './user-token.repository';

const typeOrmModule = TypeOrmModule.forFeature([UserToken]);

@Module({
  imports: [typeOrmModule],
  providers: [UserTokenService, UserTokenRepository],
  exports: [typeOrmModule, UserTokenService],
})
export class UserTokenModule {}
