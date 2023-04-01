import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@lib/entity/user/user.entity';
import { ReviewPostModule } from '../review-post/review-post.module';
import { PinReviewPostModule } from '../pin-review-post/pin-review-post.module';
import { ReplyModule } from '../reply/reply.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ReviewPostModule, PinReviewPostModule, ReplyModule],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [TypeOrmModule.forFeature([User]), UserService],
})
export class UserModule {}
