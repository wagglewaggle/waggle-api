import { Injectable } from '@nestjs/common';
import { ReplyRepository } from './reply.repository';

@Injectable()
export class ReplyService {
  constructor(private readonly replyRepository: ReplyRepository) {}

  async addReply() {}
}
