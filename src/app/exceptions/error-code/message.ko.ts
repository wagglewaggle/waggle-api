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
  ERR_0000009: '잘못된 요청입니다.',
  ERR_0000010: '요청 타입은 문자열이어야 합니다.',

  ERR_0002001: '해당하는 장소가 없습니다.',

  ERR_0004001: '조회하려는 주변 장소가 없습니다.',
};

export default errors;
