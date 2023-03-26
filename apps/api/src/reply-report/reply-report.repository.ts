import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { ReplyReport } from '@lib/entity/reply-report/reply-report.entity';
import { UserEntity } from '../user/entity/user.entity';
import { Reply } from '@lib/entity/reply/reply.entity';

@Injectable()
export class ReplyReportRepository {
  constructor(@InjectRepository(ReplyReport) private readonly repository: Repository<ReplyReport>) {}

  createInstance(user: UserEntity, reply: Reply) {
    return this.repository.create({ user, reply });
  }

  createQueryBuilder(alias = 'replyReport') {
    return this.repository.createQueryBuilder(alias);
  }

  async addReplyReport(replyReport: ReplyReport, manager?: EntityManager) {
    if (manager) {
      return manager.save(ReplyReport, replyReport);
    }
    return this.repository.save(replyReport);
  }

  async getReplyReport(reply: Reply) {
    const queryBuilder = this.createQueryBuilder()
      .leftJoinAndSelect('replyReport.user', 'user')
      .leftJoin('replyReport.reply', 'reply')
      .where('replyReport.replyIdx = :replyIdx', { replyIdx: reply.idx });

    return queryBuilder.getMany();
  }
}
