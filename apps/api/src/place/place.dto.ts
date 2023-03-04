import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { PlaceType } from '../app/app.constant';
import { ListFilterQueryDto } from '../app/app.dto';
import { PopulationLevel } from './place.constant';

export class PlaceListFilterQueryDto extends ListFilterQueryDto {
  level?: PopulationLevel;
}

export class PlaceParamDto {
  @Type(() => Number)
  @IsNumber()
  idx: number;

  @IsEnum(PlaceType)
  type: PlaceType;
}
