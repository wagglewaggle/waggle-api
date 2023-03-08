import { Validate } from 'class-validator';
import { IsString, IsStringNumber } from '../app/validations/common.validation';

export class CreateReplyDto {
  @Validate(IsString)
  content: string;
}

export class GetReplyIdxParamDto {
  @Validate(IsStringNumber)
  replyIdx: number;
}
