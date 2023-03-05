import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, EntityManager, Repository } from 'typeorm';
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
}
