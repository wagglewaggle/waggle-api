import { IsString } from 'class-validator';

export class ModifyUserSettingBodyDto {
  @IsString()
  nickname: string;
}
