import { IsEnum, IsNumber } from 'class-validator';
import { PlaceType } from '../app/app.constant';

export class AddPinPlaceBodyDto {
  @IsNumber()
  idx: number;

  @IsEnum(PlaceType)
  type: PlaceType;
}
