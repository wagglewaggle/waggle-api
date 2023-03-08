import { Validate } from 'class-validator';
import { IsString } from '../app/validations/common.validation';

export class CreateReplyDto {
  @Validate(IsString)
  content: string;
}
