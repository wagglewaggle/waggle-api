import { ExtraPlace } from 'waggle-entity/dist/extra-place/extra-place.entity';
import { KtPlace } from 'waggle-entity/dist/kt-place/kt-place.entity';
import { PinReviewPost } from 'waggle-entity/dist/pin-review-post/pin-review-post.entity';
import { Reply } from 'waggle-entity/dist/reply/reply.entity';
import { ReviewPostImage } from 'waggle-entity/dist/review-post-image/review-post-image.entity';
import { ReviewPostStatus } from 'waggle-entity/dist/review-post/review-post.constant';
import { ReviewPost } from 'waggle-entity/dist/review-post/review-post.entity';
import { SktPlace } from 'waggle-entity/dist/skt-place/skt-place.entity';
import { User } from 'waggle-entity/dist/user/user.entity';
import { ReviewPostReport } from 'waggle-entity/dist/review-post-report/review-post-report.entity';

export class ReviewPostEntity extends ReviewPost {
  readonly idx: number;
  readonly content: string;
  readonly view: number;
  readonly status: ReviewPostStatus;
  readonly createdDate: Date;
  readonly updatedDate: Date;
  readonly replies: Reply[];
  readonly reviewPostImages: ReviewPostImage[];
  readonly pinReviewPosts: PinReviewPost[];
  readonly reports: ReviewPostReport[];
  readonly user: User;
  readonly sktPlace: SktPlace;
  readonly ktPlace: KtPlace;
  readonly extraPlace: ExtraPlace;

  constructor(reviewPost: ReviewPost) {
    super();
    Object.assign(this, reviewPost);
  }
}
