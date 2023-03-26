import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReplyReport } from '@lib/entity/reply-report/reply-report.entity';
import { ReplyReportService } from './reply-report.service';
import { ReplyReportRepository } from './reply-report.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ReplyReport])],
  providers: [ReplyReportService, ReplyReportRepository],
  exports: [TypeOrmModule, ReplyReportService],
})
export class ReplyReportModule {}
