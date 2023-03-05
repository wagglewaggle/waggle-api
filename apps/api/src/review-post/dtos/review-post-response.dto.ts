import { Expose } from 'class-transformer';
import { PinReviewPost } from '@lib/entity/pin-review-post/pin-review-post.entity';
import { ReviewPostImage } from '@lib/entity/review-post-image/review-post-image.entity';
import { ReviewPostEntity } from '../entity/review-post.entity';
import { ReviewPostListResponseDto } from './review-post-list-response.dto';
import { ReviewPostReplyResponseDto } from './review-post-reply-response.dto';

export class ReviewPostResponseDto extends ReviewPostListResponseDto {
  constructor(reviewPost: ReviewPostEntity) {
    super(reviewPost);
  }

  @Expose()
  get replies(): ReviewPostReplyResponseDto[] {
    return this._replies.map((reply) => new ReviewPostReplyResponseDto(reply));
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
