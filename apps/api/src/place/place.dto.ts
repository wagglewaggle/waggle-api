import { Validate } from 'class-validator';
import { PlaceType } from '../app/app.constant';
import { ListFilterQueryDto } from '../app/app.dto';
import { IsPlaceType, IsStringNumber } from '../app/validations/common.validation';
import { PopulationLevel } from './place.constant';

export class PlaceListFilterQueryDto extends ListFilterQueryDto {
  level?: PopulationLevel;
}

export class PlaceParamDto {
  @Validate(IsStringNumber)
  idx: number;

  @Validate(IsPlaceType)
  type: PlaceType;
}
