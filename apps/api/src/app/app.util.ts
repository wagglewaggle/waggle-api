import * as jwt from 'jsonwebtoken';
import { config } from '@lib/config';

export const jwtSign = async (payload: string | object | Buffer): Promise<string> => {
  return await jwt.sign(payload, config.jwtSecretKey, { expiresIn: '1h' });
};

export const jwtVerify = async (token: string) => {
  return await jwt.verify(token, config.jwtSecretKey);
};
