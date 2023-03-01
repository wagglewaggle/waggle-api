import { HttpStatus, Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { PlaceType } from '../app.constant';
import ERROR_CODE from '../exceptions/error-code';
import { ClientRequestException } from '../exceptions/request.exception';

const USERNAME_RULE = /^[가-힣a-zA-Z0-9\s]{1,9}$/;

@ValidatorConstraint({ name: 'isUsername' })
@Injectable()
export class IsUsername implements ValidatorConstraintInterface {
  validate(value: any, validationArguments: ValidationArguments): boolean {
    const property = validationArguments.property;
    if (!value) {
      throw new ClientRequestException(ERROR_CODE.ERR_0000009, HttpStatus.BAD_REQUEST, { value: property });
    }

    if (USERNAME_RULE.test(value)) {
      return true;
    }

    throw new ClientRequestException(ERROR_CODE.ERR_0006007, HttpStatus.BAD_REQUEST);
  }
}

@ValidatorConstraint({ name: 'isNumber' })
@Injectable()
export class IsNumber implements ValidatorConstraintInterface {
  validate(value: any, validationArguments: ValidationArguments): boolean {
    const property = validationArguments.property;
    if (!value) {
      throw new ClientRequestException(ERROR_CODE.ERR_0000009, HttpStatus.BAD_REQUEST, { value: property });
    }

    if (Number.isInteger(value)) {
      return true;
    }

    throw new ClientRequestException(ERROR_CODE.ERR_0001001, HttpStatus.BAD_REQUEST, { value: property });
  }
}

@ValidatorConstraint({ name: 'isString' })
@Injectable()
export class IsString implements ValidatorConstraintInterface {
  validate(value: any, validationArguments: ValidationArguments): boolean {
    const property = validationArguments.property;
    if (!value) {
      throw new ClientRequestException(ERROR_CODE.ERR_0000009, HttpStatus.BAD_REQUEST, { value: property });
    }

    if (typeof value === 'string') {
      return true;
    }

    throw new ClientRequestException(ERROR_CODE.ERR_0001002, HttpStatus.BAD_REQUEST, { value: property });
  }
}

@ValidatorConstraint({ name: 'isPlaceType' })
@Injectable()
export class IsPlaceType implements ValidatorConstraintInterface {
  validate(value: any, validationArguments: ValidationArguments): boolean {
    const property = validationArguments.property;
    if (!value) {
      throw new ClientRequestException(ERROR_CODE.ERR_0000009, HttpStatus.BAD_REQUEST, { value: property });
    }

    if ([PlaceType.Kt, PlaceType.Skt].includes(value)) {
      return true;
    }

    throw new ClientRequestException(ERROR_CODE.ERR_0002002, HttpStatus.BAD_REQUEST, { value });
  }
}
