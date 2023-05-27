import { Injectable } from '@nestjs/common';
import { ReplyService } from '../reply/reply.service';
import { ReviewPostService } from '../review-post/review-post.service';
import { UserEntity } from '../user/entity/user.entity';

@Injectable()
export class ReportService {
  constructor(private readonly reviewPostService: ReviewPostService, private readonly replyService: ReplyService) {}

  async reportReviewPost(user: UserEntity, idx: number) {
    await this.reviewPostService.reportReviewPost(user, idx);
  }

  async reportReply(user: UserEntity, idx: number) {
    await this.replyService.reportReply(user, idx);
  }
}
