import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { SnsType } from '@lib/entity/user/user.constant';
import { User } from '@lib/entity/user/user.entity';
import { RequestExtras } from './interceptors/request-extras';

export interface IRequestAugmented extends Request {
  extras: RequestExtras;
}

export interface IRequestLocation {
  country?: string;
  region?: string;
  city?: string;
  timezone?: string;
}

export interface IRequestExtraData {
  payload: JwtUserPayload;
  user: User;
}

export interface JwtUserPayload extends JwtPayload {
  idx: number;
  type: SnsType;
  email: string;
  name: string;
}
