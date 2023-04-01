import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, EntityManager, FindOptionsWhere, Repository } from 'typeorm';
import { Reply } from '@lib/entity/reply/reply.entity';
import { UserEntity } from '../user/entity/user.entity';
import { ListFilterQueryDto } from '../app/app.dto';
import { ReplyStatus } from '@lib/entity/reply/reply.constant';

@Injectable()
export class ReplyRepository {
  constructor(@InjectRepository(Reply) private readonly repository: Repository<Reply>) {}

  createInstance(reply: DeepPartial<Reply>): Reply {
    return this.repository.create(reply);
  }

  createQueryBuilder(alias = 'reply') {
    return this.repository.createQueryBuilder(alias);
  }

  async addReply(reply: Reply, manager?: EntityManager) {
    if (manager) {
      return manager.save(Reply, reply);
    }
    return this.repository.save(reply);
  }

  async getReply(where: FindOptionsWhere<Reply>, relations?: string[]): Promise<Reply | undefined> {
    const options: any = { where };
    if (Array.isArray(relations)) {
      options.relations = relations;
    }
    const reply = await this.repository.findOne(options);
    return reply || undefined;
  }

  async getRepliesByUser(user: UserEntity, query: ListFilterQueryDto = {}): Promise<[Reply[], number]> {
    const queryBuilder = this.createQueryBuilder()
      .leftJoinAndSelect('reply.reviewPost', 'reviewPost')
      .leftJoinAndSelect('reviewPost.ktPlace', 'ktPlace')
      .leftJoinAndSelect('reviewPost.sktPlace', 'sktPlace')
      .leftJoinAndSelect('reviewPost.extraPlace', 'extraPlace')
      .where('reply.userIdx = :userIdx', { userIdx: user.idx });

    if (query.limit) {
      queryBuilder.take(query.limit);
    }

    if (query.offset) {
      queryBuilder.skip(query.offset);
    }

    if (query.searchTerm) {
      queryBuilder.andWhere(`reply.content LIKE '%${query.searchTerm}%'`);
    }

    queryBuilder.andWhere('reply.status = :status', { status: ReplyStatus.Activated });
    queryBuilder.orderBy('reply.createdDate', 'DESC');

    return queryBuilder.getManyAndCount();
  }

  async deleteReply(reply: Reply, manager?: EntityManager) {
    if (manager) {
      return manager.remove(Reply, reply);
    }
    return this.repository.remove(reply);
  }

  async updateReply(where: Partial<Reply>, set: Partial<Reply>, manager?: EntityManager) {
    if (manager) {
      return manager.update(Reply, where, set);
    }
    return this.repository.update(where, set);
  }
}
