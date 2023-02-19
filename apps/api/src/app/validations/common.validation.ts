import { HttpStatus, Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import ERROR_CODE from '../exceptions/error-code';
import { ClientRequestException } from '../exceptions/request.exception';

const USERNAME_RULE = /^[가-힣a-zA-Z0-9\s]{1,9}$/;

@ValidatorConstraint({ name: 'isUsername' })
@Injectable()
export class IsUsername implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    if (!value) {
      throw new ClientRequestException(ERROR_CODE.ERR_0000009, HttpStatus.BAD_REQUEST, { value: 'nickname' });
    }

    if (USERNAME_RULE.test(value)) {
      return true;
    }

    throw new ClientRequestException(ERROR_CODE.ERR_0006007, HttpStatus.BAD_REQUEST);
  }
}
