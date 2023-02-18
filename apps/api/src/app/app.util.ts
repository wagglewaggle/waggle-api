import * as jwt from 'jsonwebtoken';
import { config } from '@lib/config';
import { ClientRequestException } from './exceptions/request.exception';
import ERROR_CODE from './exceptions/error-code';
import { HttpStatus } from '@nestjs/common';
import { JwtUserPayload } from './app.interface';

export const jwtSign = async (payload: string | object | Buffer): Promise<string> => {
  try {
    return await jwt.sign(payload, config.jwtSecretKey, { expiresIn: '1h' });
  } catch (e) {
    throw new ClientRequestException(ERROR_CODE.ERR_0000001, HttpStatus.INTERNAL_SERVER_ERROR);
  }
};

export const jwtVerify = async (token: string): Promise<JwtUserPayload> => {
  try {
    return (await jwt.verify(token, config.jwtSecretKey)) as JwtUserPayload;
  } catch (e) {
    throw new ClientRequestException(ERROR_CODE.ERR_0000004, HttpStatus.UNAUTHORIZED);
  }
};
