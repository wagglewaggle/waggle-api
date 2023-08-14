import { Request } from 'express';
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
