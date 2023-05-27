import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { ReviewPostModule } from '../review-post/review-post.module';
import { ReplyModule } from '../reply/reply.module';

@Module({
  imports: [ReviewPostModule, ReplyModule],
  providers: [ReportService],
  controllers: [ReportController],
})
export class ReportModule {}
