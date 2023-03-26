import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { ReplyReport } from '@lib/entity/reply-report/reply-report.entity';
import { Reply } from '@lib/entity/reply/reply.entity';
import { UserEntity } from '../user/entity/user.entity';
import { ReplyReportRepository } from './reply-report.repository';

@Injectable()
export class ReplyReportService {
  constructor(private readonly replyReportRepository: ReplyReportRepository) {}

  async addReviewPostReport(user: UserEntity, reply: Reply, manager?: EntityManager) {
    const reviewPostReport = this.replyReportRepository.createInstance(user, reply);
    await this.replyReportRepository.addReplyReport(reviewPostReport, manager);
  }

  async getReviewPostReport(reply: Reply): Promise<ReplyReport[]> {
    return await this.replyReportRepository.getReplyReport(reply);
  }
}
