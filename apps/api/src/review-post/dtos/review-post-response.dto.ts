import { Expose } from 'class-transformer';
import { PinReviewPost } from '@lib/entity/pin-review-post/pin-review-post.entity';
import { ReviewPostImage } from '@lib/entity/review-post-image/review-post-image.entity';
import { ReviewPostEntity } from '../entity/review-post.entity';
import { ReviewPostSimpleResponseDto } from './review-post-simple-response.dto';

export class ReviewPostResponseDto extends ReviewPostSimpleResponseDto {
  constructor(reviewPost: ReviewPostEntity, pinReviewPostMap?: Map<number, boolean>) {
    super(reviewPost, pinReviewPostMap);
  }

  @Expose()
  get replies(): Record<string, any>[] {
    const mainReplies = this._replies.filter((reply) => reply.level === 0);
    return mainReplies.map((mainReply) => {
      const levelReplies = this._replies.filter((reply) => reply.mainReplyIdx === mainReply.idx);
      return {
        ...mainReply,
        levelReplies,
      };
    });
  }

  @Expose()
  get images(): ReviewPostImage[] {
    return this._reviewPostImages;
  }

  @Expose()
  get pinReviewPosts(): PinReviewPost[] {
    return this._pinReviewPosts;
  }
}
