import { Validate } from 'class-validator';
import { IsNumber } from '../app/validations/common.validation';

export class PinReviewPostBodyDto {
  @Validate(IsNumber)
  idx: number;
}
