import { Module } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { ReplyController } from './reply.controller';
import { ReplyRepository } from './reply.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reply } from 'waggle-entity/dist/reply/reply.entity';
import { ReviewPostModule } from '../review-post/review-post.module';
import { SlackModule } from '../app/slack/slack.module';
import { ReplyReportModule } from '../reply-report/reply-report.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reply]), ReviewPostModule, ReplyReportModule, SlackModule],
  providers: [ReplyService, ReplyRepository],
  controllers: [ReplyController],
  exports: [TypeOrmModule, ReplyService],
})
export class ReplyModule {}
