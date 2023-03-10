import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, EntityManager, FindOptionsWhere, Repository } from 'typeorm';
import { Reply } from '@lib/entity/reply/reply.entity';

@Injectable()
export class ReplyRepository {
  constructor(@InjectRepository(Reply) private readonly repository: Repository<Reply>) {}

  createInstance(reply: DeepPartial<Reply>): Reply {
    return this.repository.create(reply);
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
