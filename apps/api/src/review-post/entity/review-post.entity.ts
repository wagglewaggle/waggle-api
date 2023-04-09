import { ExtraPlace } from '@lib/entity/extra-place/extra-place.entity';
import { KtPlace } from '@lib/entity/kt-place/kt-place.entity';
import { PinReviewPost } from '@lib/entity/pin-review-post/pin-review-post.entity';
import { Reply } from '@lib/entity/reply/reply.entity';
import { ReviewPostImage } from '@lib/entity/review-post-image/review-post-image.entity';
import { ReviewPostStatus } from '@lib/entity/review-post/review-post.constant';
import { ReviewPost } from '@lib/entity/review-post/review-post.entity';
import { SktPlace } from '@lib/entity/skt-place/skt-place.entity';
import { User } from '@lib/entity/user/user.entity';
import { ReviewPostReport } from '@lib/entity/review-post-report/review-post-report.entity';

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
