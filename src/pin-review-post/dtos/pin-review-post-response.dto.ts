import { Exclude, Expose } from 'class-transformer';
import { PinReviewPost } from 'waggle-entity/dist/pin-review-post/pin-review-post.entity';
import { ReviewPost } from 'waggle-entity/dist/review-post/review-post.entity';
import { ReviewPostEntity } from '../../review-post/entity/review-post.entity';
import { ReviewPostSimpleResponseDto } from '../../review-post/dtos/review-post-simple-response.dto';

export class PinReviewPostResponseDto {
  @Exclude() private readonly _idx: number;
  @Exclude() private readonly _reviewPost: ReviewPost;
  @Exclude() private readonly _pinReviewPostIdxMap: Map<number, boolean>;
  @Exclude() private readonly _createdDate: Date;

  constructor(pinReviewPost: PinReviewPost, pinReviewPostIdxMap: Map<number, boolean>) {
    this._idx = pinReviewPost.idx;
    this._reviewPost = pinReviewPost.reviewPost;
    this._pinReviewPostIdxMap = pinReviewPostIdxMap;
    this._createdDate = pinReviewPost.createdDate;
  }

  @Expose()
  get idx(): number {
    return this._idx;
  }

  @Expose()
  get reviewPost(): ReviewPostSimpleResponseDto {
    return new ReviewPostSimpleResponseDto(new ReviewPostEntity(this._reviewPost), this._pinReviewPostIdxMap);
  }

  @Expose()
  get createdDate(): Date {
    return this._createdDate;
  }
}
