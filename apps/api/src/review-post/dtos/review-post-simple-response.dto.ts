import { Exclude, Expose } from 'class-transformer';
import { ExtraPlace } from '@lib/entity/extra-place/extra-place.entity';
import { KtPlace } from '@lib/entity/kt-place/kt-place.entity';
import { PinReviewPost } from '@lib/entity/pin-review-post/pin-review-post.entity';
import { Reply } from '@lib/entity/reply/reply.entity';
import { ReviewPostImage } from '@lib/entity/review-post-image/review-post-image.entity';
import { ReviewPostStatus } from '@lib/entity/review-post/review-post.constant';
import { SktPlace } from '@lib/entity/skt-place/skt-place.entity';
import { User } from '@lib/entity/user/user.entity';
import { PlaceResponseDto } from '../../place/dtos/place-response.dto';
import { PlaceEntity } from '../../place/entity/place.entity';
import { UserResponseDto } from '../../user/dtos/user-response.dto';
import { UserEntity } from '../../user/entity/user.entity';
import { ReviewPostEntity } from '../entity/review-post.entity';

export class ReviewPostSimpleResponseDto {
  @Exclude() protected readonly _idx: number;
  @Exclude() protected readonly _content: string;
  @Exclude() protected readonly _view: number;
  @Exclude() protected readonly _report: number;
  @Exclude() protected readonly _status: ReviewPostStatus;
  @Exclude() protected readonly _createdDate: Date;
  @Exclude() protected readonly _updatedDate: Date;
  @Exclude() protected readonly _replies: Reply[];
  @Exclude() protected readonly _reviewPostImages: ReviewPostImage[];
  @Exclude() protected readonly _pinReviewPosts: PinReviewPost[];
  @Exclude() protected readonly _isPin?: boolean;
  @Exclude() protected readonly _user?: User;
  @Exclude() protected readonly _sktPlace?: SktPlace;
  @Exclude() protected readonly _ktPlace?: KtPlace;
  @Exclude() protected readonly _extraPlace?: ExtraPlace;

  constructor(reviewPost: ReviewPostEntity, pinReviewPostMap?: Map<number, boolean>) {
    this._idx = reviewPost.idx;
    this._content = reviewPost.content;
    this._view = reviewPost.view;
    this._report = reviewPost.report;
    this._status = reviewPost.status;
    this._createdDate = reviewPost.createdDate;
    this._updatedDate = reviewPost.updatedDate;
    this._replies = reviewPost.replies;
    this._reviewPostImages = reviewPost.reviewPostImages;
    this._pinReviewPosts = reviewPost.pinReviewPosts;
    if (pinReviewPostMap) {
      this._isPin = pinReviewPostMap.get(reviewPost.idx) || false;
    }
    this._user = reviewPost.user;
    this._sktPlace = reviewPost.sktPlace;
    this._ktPlace = reviewPost.ktPlace;
    this._extraPlace = reviewPost.extraPlace;
  }

  @Expose()
  get idx(): number {
    return this._idx;
  }

  @Expose()
  get content(): string {
    return this._content;
  }

  @Expose()
  get view(): number {
    return this._view;
  }

  @Expose()
  get report(): number {
    return this._report;
  }

  @Expose()
  get status(): ReviewPostStatus {
    return this._status;
  }

  @Expose()
  get createdDate(): Date {
    return this._createdDate;
  }

  @Expose()
  get updatedDate(): Date {
    return this._updatedDate;
  }

  @Expose()
  get replyCount(): number {
    return this._replies.length;
  }

  @Expose()
  get pinReviewPostCount(): number {
    return this._pinReviewPosts.length;
  }

  @Expose()
  get isPin(): boolean | undefined {
    return this._isPin;
  }

  @Expose()
  get writer(): UserResponseDto | undefined {
    if (this._user) {
      return new UserResponseDto(new UserEntity(this._user));
    }
  }

  @Expose()
  get place(): PlaceResponseDto {
    let place;
    if (this._sktPlace) {
      place = new PlaceEntity(this._sktPlace);
    } else if (this._ktPlace) {
      place = new PlaceEntity(this._ktPlace);
    } else if (this._extraPlace) {
      place = new PlaceEntity(this._extraPlace);
    }

    return new PlaceResponseDto(place);
  }
}
