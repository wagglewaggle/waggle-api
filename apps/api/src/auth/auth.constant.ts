export enum ApiPath {
  Root = 'auth',
  Redirect = 'redirect',
  Naver = 'naver',
  Google = 'google',
  Kakao = 'kakao',
  Reissue = 'reissue',
}

export enum NaverApiUrl {
  Token = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id={client_id}&client_secret={client_secret}&code={code}&state={state}',
  Information = 'https://openapi.naver.com/v1/nid/me',
}

export enum KakaoApiUrl {
  Token = 'https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id={client_id}&redirect_ur={redirect_uri}&code={code}',
  Information = 'https://kapi.kakao.com/v2/user/me',
}

export enum GoogleApiUrl {
  Token = 'https://oauth2.googleapis.com/token?code={code}&client_id={client_id}&client_secret={client_secret}&redirect_uri={redirect_uri}&grant_type=authorization_code',
  Information = 'https://www.googleapis.com/oauth2/v2/userinfo',
}
