import { Module } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { ReplyController } from './reply.controller';
import { ReplyRepository } from './reply.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reply } from '@lib/entity/reply/reply.entity';
import { ReviewPostModule } from '../review-post/review-post.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reply]), ReviewPostModule],
  providers: [ReplyService, ReplyRepository],
  controllers: [ReplyController],
  exports: [TypeOrmModule, ReplyService],
})
export class ReplyModule {}
