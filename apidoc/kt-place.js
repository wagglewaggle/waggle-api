/**
 * @api {get} /api/kt-place 모든 장소 조회
 * @apiDescription kt 통신사가 제공하는 모든 장소 확인
 * @apiGroup KT Place
 * 
 * @apiQuery {string="RELAXATION","NORMAL","CROWDED","VERY_CROWDED"} [level] 혼잡도 level</br>여유 = 'RELAXATION'</br>보통 = 'NORMAL'</br>붐빔 = 'CROWDED'</br>매우 붐빔 = 'VERY_CROWDED'
 * @apiQuery {boolean="false","true"} populationSort 혼잡도 정렬 순</br>false: 오름차순</br>true: 내림차순
 * @apiQuery {string="테마파크","쇼핑몰","공원","골목 및 거리","궁궐","지하철","마을","크리스마스 핫플레이스"} [category] 카테고리
 * 
 * @apiSuccess {array} list response 결과
 * @apiSuccess {number} list.idx 장소 idx
 * @apiSuccess {string} list.name 장소 이름
 * @apiSuccess {number} list.x x좌표
 * @apiSuccess {number} list.y y좌표
 * @apiSuccess {array} list.categories 장소 카테고리 목록
 * @apiSuccess {idx} list.categories.idx 카테고리 idx
 * @apiSuccess {type} list.categories.type 카테고리 타입
 * @apiSuccess {object} list.populations 혼잡도
 * @apiSuccess {number} list.populations.idx 혼잡도 idx
 * @apiSuccess {string} list.populations.level 혼잡도 level</br>여유 = 'RELAXATION'</br>보통 = 'NORMAL'</br>붐빔 = 'CROWDED'</br>매우 붐빔 = 'VERY_CROWDED'
 * @apiSuccess {string} list.populations.message 혼잡도 message
 * @apiSuccess {number} list.populations.male 남성 비율
 * @apiSuccess {number} list.populations.female 여성 비율
 * @apiSuccess {number} list.populations.zeroGen 0~10세 인구 비율
 * @apiSuccess {number} list.populations.teenage 10대 인구 비율
 * @apiSuccess {number} list.populations.twenties 20대 인구 비율
 * @apiSuccess {number} list.populations.thirties 30대 인구 비율
 * @apiSuccess {number} list.populations.forties 40대 인구 비율
 * @apiSuccess {number} list.populations.fifties 50대 인구 비율
 * @apiSuccess {number} list.populations.sixties 60대 인구 비율
 * @apiSuccess {number} list.populations.seventies 70대 인구 비율
 * @apiSuccess {number} list.populations.resident 상주 인구 비율
 * @apiSuccess {number} list.populations.nonResident 비상주 인구 비율
 * @apiSuccess {Date} list.populations.createdDate 생성 날짜
 * @apiSuccess {Date} list.populations.updatedDate 업데이트 날짜
 * @apiSuccess {number} count response 개수
 *
 * @apiSuccessExample Response (example):
 * HTTP/1.1 200 OK
 * {
  "list": [
      {
          "idx": 37,
          "name": "월드컵공원",
          "x": 37.57019501908968,
          "y": 126.8833351135254,
          "categories": [
              {
                  "idx": 47,
                  "type": "공원"
              }
          ],
          "populations": [
              {
                  "idx": 37,
                  "level": "RELAXATION",
                  "message": "사람이 몰려있을 가능성이 낮고 붐빔은 거의 느껴지지 않아요. 도보 이동이 자유로워요.",
                  "male": 51,
                  "female": 49,
                  "zeroGen": 1,
                  "teenage": 7,
                  "twenties": 13,
                  "thirties": 20,
                  "forties": 21,
                  "fifties": 21,
                  "sixties": 12,
                  "seventies": 5,
                  "resident": 5,
                  "nonResident": 95,
                  "createdDate": "2022-12-17T20:25:34.812Z",
                  "updatedDate": "2022-12-18T16:21:51.000Z"
              }
          ]
      }
  ],
  "count": 40
}
 */

/**
 * @api {get} /api/kt-place/:idx 특정 장소 조회
 * @apiDescription kt 통신사가 제공하는 특정 장소 확인
 * @apiGroup KT Place
 * 
 * @apiParam {number} idx 장소 idx
 * 
 * @apiSuccess {number} idx 장소 idx
 * @apiSuccess {string} name 장소 이름
 * @apiSuccess {number} x x좌표
 * @apiSuccess {number} y y좌표
 * @apiSuccess {object} populations 혼잡도
 * @apiSuccess {number} populations.idx 혼잡도 idx
 * @apiSuccess {string} populations.level 혼잡도 level</br>여유 = 'RELAXATION'</br>보통 = 'NORMAL'</br>붐빔 = 'CROWDED'</br>매우 붐빔 = 'VERY_CROWDED'
 * @apiSuccess {string} populations.message 혼잡도 message
 * @apiSuccess {number} populations.male 남성 비율
 * @apiSuccess {number} populations.female 여성 비율
 * @apiSuccess {number} populations.zeroGen 0~10세 인구 비율
 * @apiSuccess {number} populations.teenage 10대 인구 비율
 * @apiSuccess {number} populations.twenties 20대 인구 비율
 * @apiSuccess {number} populations.thirties 30대 인구 비율
 * @apiSuccess {number} populations.forties 40대 인구 비율
 * @apiSuccess {number} populations.fifties 50대 인구 비율
 * @apiSuccess {number} populations.sixties 60대 인구 비율
 * @apiSuccess {number} populations.seventies 70대 인구 비율
 * @apiSuccess {number} populations.resident 상주 인구 비율
 * @apiSuccess {number} populations.nonResident 비상주 인구 비율
 * @apiSuccess {Date} populations.createdDate 생성 날짜
 * @apiSuccess {Date} populations.updatedDate 업데이트 날짜
 * @apiSuccess {array} accidents 사고 발생 구역
 * @apiSuccess {number} accidents.idx 사고 idx
 * @apiSuccess {string} accidents.type 사고 발생 유형
 * @apiSuccess {string} accidents.dtype 사고 발생 세부 유형
 * @apiSuccess {string} accidents.info 사고 통제 내용
 * @apiSuccess {number} accidents.x 사고 통제 지점 x좌표
 * @apiSuccess {number} accidents.y 사고 통제 지점 y좌표
 * @apiSuccess {Date} accidents.createdDate 생성 날짜
 * @apiSuccess {Date} accidents.updatedDate 업데이트 날짜
 * @apiSuccess {array} cctvs cctv 리스트
 * @apiSuccess {number} cctvs.idx cctv idx
 * @apiSuccess {string} cctvs.src cctv 주소
 * @apiSuccess {string} cctvs.cctvname cctv 이름
 *
 * @apiSuccessExample Response (example):
 * HTTP/1.1 200 OK
 * {
    "idx": 2,
    "name": "동대문 관광특구",
    "x": 37.56726967170572,
    "y": 127.0113515853882,
    "populations": [
        {
            "idx": 2,
            "level": "NORMAL",
            "message": "사람이 몰려있을 수 있지만 크게 붐비지는 않아요. 도보 이동에 큰 제약이 없어요.",
            "male": 44,
            "female": 56,
            "zeroGen": 1,
            "teenage": 7,
            "twenties": 27,
            "thirties": 23,
            "forties": 17,
            "fifties": 13,
            "sixties": 8,
            "seventies": 3,
            "resident": 11,
            "nonResident": 89,
            "createdDate": "2022-12-17T20:25:05.159Z",
            "updatedDate": "2022-12-18T16:20:17.000Z"
        }
    ],
    "accidents": [
        {
            "idx": 2,
            "type": "집회및행사",
            "dtype": "행사",
            "info": "[통제] 청계천로 차 없는 거리 행사(청계광장~삼일교| 양방향) |(토) 14:00 ~ (일) 22:00|(공휴일) : 10:00 - 22:00",
            "x": 126.98281663886924,
            "y": 37.5687698499172,
            "createdDate": "2022-12-17T20:25:11.245Z",
            "updatedDate": "2022-12-17T20:25:11.245Z"
        },
    ],
    "cctvs": [
        {
            "idx": 1,
            "src": "/SeoulRtd/cctv?src=http://210.179.218.52:1935/live/135.stream/playlist.m3u8&cctvname=L010112",
            "cctvname": "동대문운동장"
        }
    ]
}
 */
