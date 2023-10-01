/**
 * @api {get} /api/kt-place 모든 장소 조회
 * @apiDescription kt 통신사가 제공하는 모든 장소 확인
 * @apiGroup KT Place
 *
 * @apiQuery {string="RELAXATION","NORMAL","CROWDED","VERY_CROWDED"} [level] 혼잡도 level</br>여유 = 'RELAXATION'</br>보통 = 'NORMAL'</br>붐빔 = 'CROWDED'</br>매우 붐빔 = 'VERY_CROWDED'
 * @apiQuery {boolean="false","true"} populationSort 혼잡도 정렬 순</br>false: 오름차순</br>true: 내림차순
 * @apiQuery {string} [category] 카테고리</br><a href='#api-Category-GetApiCategory'><b>카테고리 조회 api</b></a> 참고
 *
 * @apiSuccess {object[]} list response 결과
 * @apiSuccess {number} list.idx 장소 idx
 * @apiSuccess {string} list.name 장소 이름
 * @apiSuccess {number} list.x x좌표
 * @apiSuccess {number} list.y y좌표
 * @apiSuccess {object[]} list.categories 장소 카테고리 목록
 * @apiSuccess {idx} list.categories.idx 카테고리 idx
 * @apiSuccess {type} list.categories.type 카테고리 타입
 * @apiSuccess {object} list.population 혼잡도
 * @apiSuccess {number} list.population.idx 혼잡도 idx
 * @apiSuccess {string} list.population.level 혼잡도 level</br>여유 = 'RELAXATION'</br>보통 = 'NORMAL'</br>붐빔 = 'CROWDED'</br>매우 붐빔 = 'VERY_CROWDED'
 * @apiSuccess {string} list.population.message 혼잡도 message
 * @apiSuccess {number} list.population.male 남성 비율
 * @apiSuccess {number} list.population.female 여성 비율
 * @apiSuccess {number} list.population.zeroGen 0~10세 인구 비율
 * @apiSuccess {number} list.population.teenage 10대 인구 비율
 * @apiSuccess {number} list.population.twenties 20대 인구 비율
 * @apiSuccess {number} list.population.thirties 30대 인구 비율
 * @apiSuccess {number} list.population.forties 40대 인구 비율
 * @apiSuccess {number} list.population.fifties 50대 인구 비율
 * @apiSuccess {number} list.population.sixties 60대 인구 비율
 * @apiSuccess {number} list.population.seventies 70대 인구 비율
 * @apiSuccess {number} list.population.resident 상주 인구 비율
 * @apiSuccess {number} list.population.nonResident 비상주 인구 비율
 * @apiSuccess {Date} list.population.createdDate 생성 날짜
 * @apiSuccess {Date} list.population.updatedDate 업데이트 날짜
 * @apiSuccess {number} count response 개수
 *
 * @apiSuccessExample Response (example):
 * HTTP/1.1 200 OK
 * {
 *   "list": [
 *     {
 *       "idx": 12,
 *       "name": "고속터미널역",
 *       "x": 37.50465332371542,
 *       "y": 127.0059871673584,
 *       "categories": [
 *         {
 *           "idx": 6,
 *           "type": "지하철"
 *         }
 *       ],
 *       "population": {
 *         "idx": 12,
 *         "level": "CROWDED",
 *         "message": "사람들이 몰려있을 가능성이 크고 붐빈다고 느낄 수 있어요. 인구밀도가 높은 구간에서는 도보 이동시 부딪힘이 발생할 수 있어요.",
 *         "male": 36,
 *         "female": 64,
 *         "zeroGen": 0,
 *         "teenage": 9,
 *         "twenties": 25,
 *         "thirties": 23,
 *         "forties": 18,
 *         "fifties": 14,
 *         "sixties": 8,
 *         "seventies": 3,
 *         "resident": 5,
 *         "nonResident": 95,
 *         "createdDate": "2022-12-19T13:10:14.176Z",
 *         "updatedDate": "2023-09-30T09:25:31.456Z"
 *       }
 *     },
 *   ],
 *   "count": 65
 * }
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
 * @apiSuccess {object} population 혼잡도
 * @apiSuccess {number} population.idx 혼잡도 idx
 * @apiSuccess {string} population.level 혼잡도 level</br>여유 = 'RELAXATION'</br>보통 = 'NORMAL'</br>붐빔 = 'CROWDED'</br>매우 붐빔 = 'VERY_CROWDED'
 * @apiSuccess {string} population.message 혼잡도 message
 * @apiSuccess {number} population.male 남성 비율
 * @apiSuccess {number} population.female 여성 비율
 * @apiSuccess {number} population.zeroGen 0~10세 인구 비율
 * @apiSuccess {number} population.teenage 10대 인구 비율
 * @apiSuccess {number} population.twenties 20대 인구 비율
 * @apiSuccess {number} population.thirties 30대 인구 비율
 * @apiSuccess {number} population.forties 40대 인구 비율
 * @apiSuccess {number} population.fifties 50대 인구 비율
 * @apiSuccess {number} population.sixties 60대 인구 비율
 * @apiSuccess {number} population.seventies 70대 인구 비율
 * @apiSuccess {number} population.resident 상주 인구 비율
 * @apiSuccess {number} population.nonResident 비상주 인구 비율
 * @apiSuccess {Date} population.createdDate 생성 날짜
 * @apiSuccess {Date} population.updatedDate 업데이트 날짜
 * @apiSuccess {object[]} accidents 사고 발생 구역
 * @apiSuccess {number} accidents.idx 사고 idx
 * @apiSuccess {string} accidents.type 사고 발생 유형
 * @apiSuccess {string} accidents.dtype 사고 발생 세부 유형
 * @apiSuccess {string} accidents.info 사고 통제 내용
 * @apiSuccess {number} accidents.x 사고 통제 지점 x좌표
 * @apiSuccess {number} accidents.y 사고 통제 지점 y좌표
 * @apiSuccess {Date} accidents.createdDate 생성 날짜
 * @apiSuccess {Date} accidents.updatedDate 업데이트 날짜
 * @apiSuccess {object[]} cctvs cctv 리스트
 * @apiSuccess {number} cctvs.idx cctv idx
 * @apiSuccess {string} cctvs.src cctv 주소
 * @apiSuccess {string} cctvs.cctvname cctv 이름
 * @apiSuccess {object} roadTraffic 도로소통현황
 * @apiSuccess {number} roadTraffic.idx 도로소통현황 idx
 * @apiSuccess {string} roadTraffic.type 도로소통현황 상태
 * @apiSuccess {string} roadTraffic.info 도로소통현황 상세 정보
 * @apiSuccess {number} roadTraffic.avgSpeed 도로소통현황 평균 속도
 * @apiSuccess {object} locations 주변 지역
 * @apiSuccess {number} locations.idx 지역 인덱스 번호
 * @apiSuccess {string} locations.name 지역 이름
 * @apiSuccess {ktPlace[]} locations.ktPlaces kt 장소 리스트
 * @apiSuccess {sktPlace[]} locations.sktPlaces skt 장소 리스트
 *
 * @apiSuccessExample Response (example):
 * HTTP/1.1 200 OK
 * {
 *   "idx": 39,
 *   "name": "잠실종합운동장",
 *   "x": 37.5145767553017,
 *   "y": 127.07385778427124,
 *   "population": {
 *     "idx": 39,
 *     "level": "RELAXATION",
 *     "message": "사람이 몰려있을 가능성이 낮고 붐빔은 거의 느껴지지 않아요. 도보 이동이 자유로워요.",
 *     "male": 55,
 *     "female": 45,
 *     "zeroGen": 1,
 *     "teenage": 10,
 *     "twenties": 13,
 *     "thirties": 16,
 *     "forties": 26,
 *     "fifties": 16,
 *     "sixties": 12,
 *     "seventies": 7,
 *     "resident": 30,
 *     "nonResident": 70,
 *     "createdDate": "2023-09-30T01:19:10.240Z",
 *     "updatedDate": "2023-09-29T16:19:10.239Z"
 *   },
 *   "accidents": [],
 *   "cctvs": [
 *     {
 *       "idx": 58,
 *       "src": "https://data.seoul.go.kr/SeoulRtd/cctv?src=http://210.179.218.52:1935/live/165.stream/playlist.m3u8&cctvname=L010142",
 *       "cctvname": "종합운동장"
 *     }
 *   ],
 *   "roadTraffic": {
 *     "idx": 39,
 *     "type": "원활",
 *     "info": "해당 장소로 이동·진입하는 도로가 크게 막히지 않아요.",
 *     "avgSpeed": 42
 *   },
 *   "locations": {
 *     "idx": 1,
 *     "name": "송파구",
 *     "ktPlaces": [
 *       {
 *         "idx": 39,
 *         "name": "잠실종합운동장",
 *         "categories": [],
 *         "population": {
 *           "idx": 39,
 *           "level": "RELAXATION",
 *           "message": "사람이 몰려있을 가능성이 낮고 붐빔은 거의 느껴지지 않아요. 도보 이동이 자유로워요.",
 *           "male": 55,
 *           "female": 45,
 *           "zeroGen": 1,
 *           "teenage": 10,
 *           "twenties": 13,
 *           "thirties": 16,
 *           "forties": 26,
 *           "fifties": 16,
 *           "sixties": 12,
 *           "seventies": 7,
 *           "resident": 30,
 *           "nonResident": 70,
 *           "createdDate": "2023-09-30T01:19:10.240Z",
 *           "updatedDate": "2023-09-29T16:19:10.239Z"
 *         }
 *       },
 *     ],
 *     "sktPlaces": [
 *       {
 *         "idx": 2,
 *         "name": "롯데월드잠실점",
 *         "categories": [
 *           {
 *             "idx": 1,
 *             "type": "놀이공원"
 *           }
 *         ],
 *         "population": {
 *           "idx": 2,
 *           "level": "RELAXATION",
 *           "createdDate": "2022-12-19T13:30:01.106Z",
 *           "updatedDate": "2023-09-29T07:00:00.139Z"
 *         }
 *       },
 *     ]
 *   }
 * }
 */
