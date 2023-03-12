import { Validate } from 'class-validator';
import { IsNumber } from '../app/validations/common.validation';

export class AddPinReviewPostBodyDto {
  @Validate(IsNumber)
  idx: number;
}
