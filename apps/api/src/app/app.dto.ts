import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNumber } from 'class-validator';

export class PlaceIdxParamDto {
  @Type(() => Number)
  @IsNumber()
  idx: number;
}

export class ListFilterQueryDto {
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  populationSort: boolean;
}
