import { SnsType } from 'waggle-entity/dist/user/user.constant';

export interface IAuthCallbackResult {
  accessToken: string;
  refreshToken: string;
  payload: {
    type: SnsType;
    email: string;
    name: string;
  };
  existUser: boolean;
}
