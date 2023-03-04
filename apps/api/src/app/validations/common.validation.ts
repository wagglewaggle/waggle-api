import { HttpStatus, Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { CategoryType } from '@lib/entity/category/category.constant';
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

const NUMBER_RULE = /^[0-9]*$/;

@ValidatorConstraint({ name: 'isStringNumber' })
@Injectable()
export class IsStringNumber implements ValidatorConstraintInterface {
  validate(value: any, validationArguments: ValidationArguments): boolean {
    const property = validationArguments.property;
    if (!value) {
      throw new ClientRequestException(ERROR_CODE.ERR_0000009, HttpStatus.BAD_REQUEST, { value: property });
    }

    if (typeof value === 'string' && NUMBER_RULE.test(value)) {
      return true;
    }

    throw new ClientRequestException(ERROR_CODE.ERR_0001001, HttpStatus.BAD_REQUEST, { value: property });
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

    if (Object.values(PlaceType).includes(value)) {
      return true;
    }

    throw new ClientRequestException(ERROR_CODE.ERR_0002002, HttpStatus.BAD_REQUEST, { value });
  }
}

@ValidatorConstraint({ name: 'isCategoryType' })
@Injectable()
export class IsCategoryType implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    if (Object.values(CategoryType).includes(value)) {
      return true;
    }

    throw new ClientRequestException(ERROR_CODE.ERR_0001004, HttpStatus.BAD_REQUEST, { value: Object.values(CategoryType).join(' / ') });
  }
}
