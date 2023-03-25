import { Validate } from 'class-validator';
import { IsUsername } from '../app/validations/common.validation';

export class ModifyUserSettingBodyDto {
  @Validate(IsUsername)
  nickname: string;
}

export class NicknameValidationCheckQueryDto extends ModifyUserSettingBodyDto {}
