import { SnsType } from '@lib/entity/user/user.constant';

export interface IAuthCallbackResult {
  token: string;
  payload: {
    type: SnsType;
    email: string;
    name: string;
  };
  existUser: boolean;
}
