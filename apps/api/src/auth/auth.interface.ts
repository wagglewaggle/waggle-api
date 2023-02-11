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

export interface INaverInformationResponse {
  resultcode: string;
  message: string;
  response: {
    id: string;
    nickname: string;
    name: string;
    email: string;
    gender: string;
    age: string;
    birthday: string;
    profile_image: string;
    birthyear: string;
    mobile: string;
  };
}

export interface IKakaoTokenResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  refresh_token_expires_in: number;
}

export interface IKakaoInformationResponse {
  id: number;
  has_signed_up: boolean;
  connected_at: Date;
  synched_at: Date;
  properties: any;
  kakao_account: {
    profile_needs_agreement: boolean;
    profile_nickname_needs_agreement: boolean;
    profile_image_needs_agreement: boolean;
    profile: {
      nickname: string;
      thumbnail_image_url: string;
      profile_image_url: string;
      is_default_image: boolean;
    };
    name_needs_agreement: boolean;
    name: string;
    email_needs_agreement: boolean;
    is_email_valid: boolean;
    is_email_verified: boolean;
    email: string;
    age_range_needs_agreement: boolean;
    age_range: string;
    birthyear_needs_agreement: boolean;
    birthyear: string;
    birthday_needs_agreement: boolean;
    birthday: string;
    birthday_type: string;
    gender_needs_agreement: boolean;
    gender: string;
    phone_number_needs_agreement: boolean;
    phone_number: string;
    ci_needs_agreement: boolean;
    ci: string;
    ci_authenticated_at: Date;
  };
}
