import { IsString } from 'class-validator';

export class GetLocationNameParamDto {
  @IsString()
  name: string;
}
