import { IErrorCode } from './error.interface';

const errors: IErrorCode = {
  ERR_0000001: '내부 서버 에러', // 500
  ERR_0000002: '존재하지 않는 API입니다', // 404
  ERR_0000003: '미확인 에러',
  ERR_0000004: '인증 실패', // 401
  ERR_0000005: '권한 없음', // 403
  ERR_0000006: '허가된 IP가 아닙니다. 관리자에게 IP 등록 여부를 문의하세요.', // 403
  ERR_0000007: '요청시간 초과',
  ERR_0000008: 'API서버 Bad Gateway',
  ERR_0000009: '{value}는 필수 값 입니다.',

  ERR_0001001: '{value}는 정수 타입입니다.',
  ERR_0001002: '{value}는 문자열 타입입니다.',
  ERR_0001003: '잘못된 level 입니다. (enable value: VERY_RELAXATION / RELAXATION / NORMAL / CROWDED / VERY_CROWDED)',
  ERR_0001004: '잘못된 category 입니다. (enable value: {value})',

  ERR_0002001: '해당하는 장소가 없습니다.',
  ERR_0002002: '{value} 장소 타입은 존재하지 않는 타입입니다. (enable value: KT / SKT)',

  ERR_0004001: '조회하려는 주변 장소가 없습니다.',

  ERR_0005001: '네이버 소셜 로그인이 거부되었습니다.',
  ERR_0005002: '카카오 소셜 로그인이 거부되었습니다.',
  ERR_0005003: '구글 소셜 로그인이 거부되었습니다.',

  ERR_0006001: '해당 유저 정보를 찾을 수 없습니다.',
  ERR_0006002: '탈퇴했거나 이용에 제재를 당한 유저입니다.',
  ERR_0006003: '만료된 토큰입니다.',
  ERR_0006004: '유효하지 않은 토큰입니다.',
  ERR_0006005: '잘못된 jwt 서명입니다.',
  ERR_0006006: '헤더에 토큰 정보가 없습니다.',
  ERR_0006007: '잘못된 유저 닉네임입니다.',
  ERR_0006008: '이미 만료되었거나, 누군가에 의해 만료된 refresh token입니다. 다시 로그인 해주세요.',
  ERR_0006009: '잘못된 refresh token입니다.',

  ERR_0007001: '권한이 없는 핀 장소입니다.',
  ERR_0007002: '해당하는 핀 장소가 없습니다.',
};

export default errors;
