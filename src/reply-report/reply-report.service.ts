import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { ReplyReport } from 'waggle-entity/dist/reply-report/reply-report.entity';
import { Reply } from 'waggle-entity/dist/reply/reply.entity';
import { UserEntity } from '../user/entity/user.entity';
import { ReplyReportRepository } from './reply-report.repository';

@Injectable()
export class ReplyReportService {
  constructor(private readonly replyReportRepository: ReplyReportRepository) {}

  async addReplyReport(user: UserEntity, reply: Reply, manager?: EntityManager) {
    const replyReport = this.replyReportRepository.createInstance(user, reply);
    await this.replyReportRepository.addReplyReport(replyReport, manager);
  }

  async getReplyReport(reply: Reply): Promise<ReplyReport[]> {
    return await this.replyReportRepository.getReplyReport(reply);
  }
}
