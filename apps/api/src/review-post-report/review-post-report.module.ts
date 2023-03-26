import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewPostReport } from '@lib/entity/review-post-report/review-post-report.entity';
import { ReviewPostReportRepository } from './review-post-report.repository';
import { ReviewPostReportService } from './review-post-report.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewPostReport])],
  providers: [ReviewPostReportService, ReviewPostReportRepository],
  exports: [ReviewPostReportService],
})
export class ReviewPostReportModule {}
