import { Validate } from 'class-validator';
import { IsString } from '../app/validations/common.validation';

export interface CallbackQueryDto {
  code: string;
}

export class ReissueTokenBodyDto {
  @Validate(IsString)
  refreshToken: string;
}
