import { Exclude, Expose } from 'class-transformer';
import { ReplyStatus } from '@lib/entity/reply/reply.constant';
import { Reply } from '@lib/entity/reply/reply.entity';
import { ReviewPost } from '@lib/entity/review-post/review-post.entity';
import { User } from '@lib/entity/user/user.entity';
import { UserResponseDto } from '../../user/dtos/user-response.dto';
import { UserEntity } from '../../user/entity/user.entity';

export class ReviewPostReplyResponseDto {
  @Exclude() private readonly _idx: number;
  @Exclude() private readonly _reviewPost: ReviewPost;
  @Exclude() private readonly _user: User;
  @Exclude() private readonly _content: string;
  @Exclude() private readonly _status: ReplyStatus;
  @Exclude() private readonly _report: number;
  @Exclude() private readonly _createdDate: Date;
  @Exclude() private readonly _updatedDate: Date;

  constructor(reply: Reply) {
    this._idx = reply.idx;
    this._reviewPost = reply.reviewPost;
    this._user = reply.user;
    this._content = reply.content;
    this._status = reply.status;
    this._report = reply.report;
    this._createdDate = reply.createdDate;
    this._updatedDate = reply.updatedDate;
  }

  @Expose()
  get idx(): number {
    return this._idx;
  }

  @Expose()
  get user(): UserResponseDto {
    return new UserResponseDto(new UserEntity(this._user));
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
  get report(): number {
    return this._report;
  }

  @Expose()
  get createdDate(): Date {
    return this._createdDate;
  }

  @Expose()
  get updatedDate(): Date {
    return this._updatedDate;
  }
}
