export enum ApiPath {
  Root = 'auth',
  Redirect = 'redirect',
  Naver = 'naver',
  Google = 'google',
  Kakao = 'kakao',
}

export enum NaverApiUrl {
  Token = 'https://nid.naver.com/oauth2.0/token',
  Information = 'https://openapi.naver.com/v1/nid/me',
}

export enum KakaoApiUrl {
  Token = 'https://kauth.kakao.com/oauth/token',
  Information = 'https://kapi.kakao.com/v2/user/me',
}

export enum GoogleApiUrl {
  Token = 'https://oauth2.googleapis.com/token',
  Information = 'https://www.googleapis.com/oauth2/v2/userinfo',
}
