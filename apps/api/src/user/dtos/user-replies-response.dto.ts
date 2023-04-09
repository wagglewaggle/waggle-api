import { Exclude, Expose } from 'class-transformer';
import { ReplyStatus } from '@lib/entity/reply/reply.constant';
import { ReviewPost } from '@lib/entity/review-post/review-post.entity';
import { Reply } from '@lib/entity/reply/reply.entity';
import { ReviewPostEntity } from '../../review-post/entity/review-post.entity';
import { ReviewPostSimpleResponseDto } from '../../review-post/dtos/review-post-simple-response.dto';

export class UserRepliesResponseDto {
  @Exclude() private readonly _idx: number;
  @Exclude() private readonly _content: string;
  @Exclude() private readonly _status: ReplyStatus;
  @Exclude() private readonly _createdDate: Date;
  @Exclude() private readonly _updatedDate: Date;
  @Exclude() private readonly _reviewPost: ReviewPost;

  constructor(reply: Reply) {
    this._idx = reply.idx;
    this._content = reply.content;
    this._status = reply.status;
    this._createdDate = reply.createdDate;
    this._updatedDate = reply.updatedDate;
    this._reviewPost = reply.reviewPost;
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
  get status(): ReplyStatus {
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
  get reviewPost(): ReviewPostSimpleResponseDto {
    return new ReviewPostSimpleResponseDto(new ReviewPostEntity(this._reviewPost));
  }
}
