import { IsOptional, Validate } from 'class-validator';
import { PlaceType } from './app.constant';
import { IsPlaceType, IsString, IsStringNumber } from './validations/common.validation';

export class PlaceIdxParamDto {
  @Validate(IsStringNumber)
  idx: number;
}

export class ListFilterQueryDto {
  @IsOptional()
  @Validate(IsStringNumber)
  limit?: number;

  @IsOptional()
  @Validate(IsStringNumber)
  offset?: number;

  @IsOptional()
  @Validate(IsString)
  searchTerm?: string;
}

export class PlaceParamDto {
  @Validate(IsStringNumber)
  idx: number;

  @Validate(IsPlaceType)
  type: PlaceType;
}
