import { HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import ERROR_CODE from '../app/exceptions/error-code';
import { ClientRequestException } from '../app/exceptions/request.exception';
import { PopulationLevel } from './place.constant';

@Injectable()
export class PlaceListFilterPipe implements PipeTransform {
  transform(value: any) {
    if (value.level) {
      if (!Object.values(PopulationLevel).includes(value.level)) {
        throw new ClientRequestException(ERROR_CODE.ERR_0001003, HttpStatus.BAD_REQUEST);
      }
    }

    return value;
  }
}
