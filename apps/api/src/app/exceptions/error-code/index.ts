import { IErrorCode } from './error.interface';
import errorMessagesKo from './message.ko';

export const ERROR_CODE = Object.keys(errorMessagesKo).reduce(
  (acc, cur) => ({
    ...acc,
    [cur]: cur,
  }),
  {},
) as IErrorCode;

export default ERROR_CODE;
