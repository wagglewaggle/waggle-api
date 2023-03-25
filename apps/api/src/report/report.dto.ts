import { Validate } from 'class-validator';
import { IsStringNumber } from '../app/validations/common.validation';

export class ReviewPostIdxParamDto {
  @Validate(IsStringNumber)
  reviewPostIdx: number;
}

export class ReplyIdxParamDto {
  @Validate(IsStringNumber)
  replyIdx: number;
}
