import { Validate } from 'class-validator';
import { IsString, IsStringNumber } from '../app/validations/common.validation';
import { GetOneReviewPostParamDto } from '../review-post/review-post.dto';

export class CreateReplyDto {
  @Validate(IsString)
  content: string;
}

export class GetReplyIdxParamDto extends GetOneReviewPostParamDto {
  @Validate(IsStringNumber)
  replyIdx: number;
}
