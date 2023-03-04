import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, Validate } from 'class-validator';
import { CategoryType } from '@lib/entity/category/category.constant';
import { IsCategoryType } from './validations/common.validation';

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
  @Validate(IsCategoryType)
  category: CategoryType;
}
