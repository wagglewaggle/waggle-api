import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class KtPlaceIdxParamDto {
  @Type(() => Number)
  @IsNumber()
  idx: number;
}
