import { Injectable } from '@nestjs/common';
import { ReplyStatus } from '@lib/entity/reply/reply.constant';
import { UserEntity } from '../user/entity/user.entity';
import { ReplyRepository } from './reply.repository';
import { PlaceType } from '../app/app.constant';
import { ReviewPostService } from '../review-post/review-post.service';

@Injectable()
export class ReplyService {
  constructor(private readonly replyRepository: ReplyRepository, private readonly reviewPostService: ReviewPostService) {}

  async addReply(user: UserEntity, placeIdx: number, placeType: PlaceType, reviewPostIdx: number, content: string) {
    const reviewPost = await this.reviewPostService.getReviewPost(placeIdx, placeType, reviewPostIdx);
    const reply = this.replyRepository.createInstance({ user, reviewPost, content, status: ReplyStatus.Activated, report: 0 });
    await this.replyRepository.addReply(reply);
  }
}
