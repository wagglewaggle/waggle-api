import { CallbackQueryDto } from './auth.type';

export interface AuthInterface {
  callback: (query: CallbackQueryDto) => Promise<any>;
  getToken: (code: string) => Promise<Record<string, any>>;
  getInformation: (token: string, type: string) => Promise<Record<string, any>>;
}

export interface INaverTokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: string;
  error: string;
  error_description: string;
}
