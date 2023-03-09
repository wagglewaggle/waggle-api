import { IsOptional, Validate } from 'class-validator';
import { PlaceParamDto } from '../app/app.dto';
import { IsString, IsStringNumber } from '../app/validations/common.validation';

export class CreateReviewPostBodyDto {
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
