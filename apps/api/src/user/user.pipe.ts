import { HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import ERROR_CODE from '../app/exceptions/error-code';
import { ClientRequestException } from '../app/exceptions/request.exception';

@Injectable()
export class ModifyUserSettingPipe implements PipeTransform {
  transform(value: any) {
    if (!value.nickname || typeof value.nickname !== 'string') {
      throw new ClientRequestException(ERROR_CODE.ERR_0006007, HttpStatus.BAD_REQUEST);
    }

    if (value.nickname.length > 9) {
      throw new ClientRequestException(ERROR_CODE.ERR_0006007, HttpStatus.BAD_REQUEST);
    }

    return value;
  }
}
