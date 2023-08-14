import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class GetProvinceIdxDto {
  @Type(() => Number)
  @IsNumber()
  idx: number;
}
