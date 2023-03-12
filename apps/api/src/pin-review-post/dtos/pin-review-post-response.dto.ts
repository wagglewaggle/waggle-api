import { Exclude, Expose } from 'class-transformer';
import { PinReviewPost } from '@lib/entity/pin-review-post/pin-review-post.entity';
import { ReviewPost } from '@lib/entity/review-post/review-post.entity';
import { ReviewPostEntity } from '../../review-post/entity/review-post.entity';
import { ReviewPostListResponseDto } from '../../review-post/dtos/review-post-list-response.dto';

export class PinReviewPostResponseDto {
  @Exclude() private readonly _idx: number;
  @Exclude() private readonly _reviewPost: ReviewPost;
  @Exclude() private readonly _createdDate: Date;

  constructor(pinReviewPost: PinReviewPost) {
    this._idx = pinReviewPost.idx;
    this._reviewPost = pinReviewPost.reviewPost;
    this._createdDate = pinReviewPost.createdDate;
  }

  @Expose()
  get idx(): number {
    return this._idx;
  }

  @Expose()
  get reviewPost(): ReviewPostListResponseDto {
    return new ReviewPostListResponseDto(new ReviewPostEntity(this._reviewPost));
  }

  @Expose()
  get createdDate(): Date {
    return this._createdDate;
  }
}
