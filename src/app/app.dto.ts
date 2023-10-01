import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsOptional, Validate } from 'class-validator';
import { IsString } from './validations/common.validation';

export class PlaceIdxParamDto {
  @Type(() => Number)
  @IsNumber()
  idx: number;
}

export class ListFilterQueryDto {
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  populationSort: boolean;

  @IsOptional()
  @Validate(IsString)
  category: string;
}
