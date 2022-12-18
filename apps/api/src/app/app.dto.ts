import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { CategoryType } from '@lib/entity/category/category.constant';

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
  @IsEnum(CategoryType)
  category: CategoryType;
}
