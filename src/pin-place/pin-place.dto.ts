import { Validate } from 'class-validator';
import { PlaceType } from '../app/app.constant';
import { IsNumber, IsPlaceType } from '../app/validations/common.validation';

export class PinPlaceBodyDto {
  @Validate(IsNumber)
  idx: number;

  @Validate(IsPlaceType)
  type: PlaceType;
}

export class DeletePinPlaceBodyDto {
  @Validate(IsNumber)
  idx: number;
}
