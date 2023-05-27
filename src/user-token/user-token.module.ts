import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTokenService } from './user-token.service';
import { UserTokenRepository } from './user-token.repository';
import { UserToken } from 'waggle-entity/dist/user-token/user-token.entity';

const typeOrmModule = TypeOrmModule.forFeature([UserToken]);

@Module({
  imports: [typeOrmModule],
  providers: [UserTokenService, UserTokenRepository],
  exports: [typeOrmModule, UserTokenService],
})
export class UserTokenModule {}
