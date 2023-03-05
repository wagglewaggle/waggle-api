import { IsOptional, Validate } from 'class-validator';
import { PlaceType } from '../app/app.constant';
import { PlaceParamDto } from '../app/app.dto';
import { IsNumber, IsPlaceType, IsString, IsStringNumber } from '../app/validations/common.validation';

export class CreateReviewPostBodyDto {
  @Validate(IsNumber)
  placeIdx: number;

  @Validate(IsPlaceType)
  placeType: PlaceType;

  @Validate(IsString)
  content: string;

  @IsOptional()
  @Validate(IsString)
  imgUrl?: string;
}

export class GetOneReviewPostParamDto extends PlaceParamDto {
  @Validate(IsStringNumber)
  reviewPostIdx: number;
}
