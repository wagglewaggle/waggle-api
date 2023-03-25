import { Injectable } from '@nestjs/common';
import { ReplyService } from '../reply/reply.service';
import { ReviewPostService } from '../review-post/review-post.service';

@Injectable()
export class ReportService {
  constructor(private readonly reviewPostService: ReviewPostService, private readonly replyService: ReplyService) {}

  async reportReviewPost(idx: number) {
    await this.reviewPostService.reportReviewPost(idx);
  }

  async reportReply(idx: number) {
    await this.replyService.reportReply(idx);
  }
}
