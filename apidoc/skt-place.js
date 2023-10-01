/**
 * @api {get} /api/skt-place 모든 장소 조회
 * @apiDescription skt 통신사가 제공하는 모든 장소 확인
 * @apiGroup SKT Place
 *
 * @apiQuery {string="RELAXATION","NORMAL","CROWDED","VERY_CROWDED"} [level] 혼잡도 level</br>여유 = 'RELAXATION'</br>보통 = 'NORMAL'</br>붐빔 = 'CROWDED'</br>매우 붐빔 = 'VERY_CROWDED'
 * @apiQuery {boolean="false","true"} populationSort 혼잡도 정렬 순</br>false: 오름차순</br>true: 내림차순
 * @apiQuery {string} [category] 카테고리</br><a href='#api-Category-GetApiCategory'><b>카테고리 조회 api</b></a> 참고
 *
 * @apiSuccess {object[]} list response 결과
 * @apiSuccess {number} list.idx 장소 idx
 * @apiSuccess {string} list.poiId 장소 poiId
 * @apiSuccess {string} list.name 장소 이름
 * @apiSuccess {number} list.x x좌표
 * @apiSuccess {number} list.y y좌표
 * @apiSuccess {object[]} list.categories 장소 카테고리 목록
 * @apiSuccess {idx} list.categories.idx 카테고리 idx
 * @apiSuccess {type} list.categories.type 카테고리 타입
 * @apiSuccess {object} list.populations 혼잡도
 * @apiSuccess {number} list.populations.idx 혼잡도 idx
 * @apiSuccess {string} list.populations.level 혼잡도 level</br>매우 여유로음 = 'VERY_RELAXATION'</br>여유 = 'RELAXATION'</br>보통 = 'NORMAL'</br>붐빔 = 'CROWDED'</br>매우 붐빔 = 'VERY_CROWDED'
 * @apiSuccess {Date} list.populations.createdDate 생성 날짜
 * @apiSuccess {Date} list.populations.updatedDate 업데이트 날짜
 * @apiSuccess {number} count response 개수
 *
 * @apiSuccessExample Response (example):
 * HTTP/1.1 200 OK
 * {
 *   "list": [
 *     {
 *       "idx": 4,
 *       "poiId": "10067845",
 *       "name": "더현대서울",
 *       "x": 37.52601356,
 *       "y": 126.92827674,
 *       "categories": [
 *         {
 *           "idx": 2,
 *           "type": "쇼핑몰"
 *         },
 *         {
 *           "idx": 8,
 *           "type": "복합문화공간"
 *         }
 *       ],
 *       "population": {
 *         "idx": 4,
 *         "level": "VERY_RELAXATION",
 *         "createdDate": "2022-12-19T13:30:02.316Z",
 *         "updatedDate": "2023-09-29T07:00:00.160Z"
 *       }
 *     },
 *   ],
 *   "count": 4
 * }
 */

/**
 * @api {get} /api/skt-place/:idx 특정 장소 조회
 * @apiDescription skt 통신사가 제공하는 특정 장소 확인
 * @apiGroup SKT Place
 *
 * @apiParam {number} idx 장소 idx
 *
 * @apiSuccess {number} idx 장소 idx
 * @apiSuccess {string} poiId 장소 poiId
 * @apiSuccess {string} name 장소 이름
 * @apiSuccess {number} x x좌표
 * @apiSuccess {number} y y좌표
 * @apiSuccess {object} populations 혼잡도
 * @apiSuccess {number} populations.idx 혼잡도 idx
 * @apiSuccess {string} populations.level 혼잡도 level</br>매우 여유로음 = 'VERY_RELAXATION'</br>여유 = 'RELAXATION'</br>보통 = 'NORMAL'</br>붐빔 = 'CROWDED'</br>매우 붐빔 = 'VERY_CROWDED'
 * @apiSuccess {Date} populations.createdDate 생성 날짜
 * @apiSuccess {Date} populations.updatedDate 업데이트 날짜
 * @apiSuccess {object[]} cctvs cctv 리스트
 * @apiSuccess {number} cctvs.idx cctv idx
 * @apiSuccess {string} cctvs.src cctv 주소
 * @apiSuccess {string} cctvs.cctvname cctv 이름
 * @apiSuccess {object} location 주변 지역
 * @apiSuccess {number} location.idx 지역 인덱스 번호
 * @apiSuccess {string} location.name 지역 이름
 * @apiSuccess {ktPlace[]} location.ktPlaces kt 장소 리스트
 * @apiSuccess {sktPlace[]} location.sktPlaces skt 장소 리스트
 *
 * @apiSuccessExample Response (example):
 * HTTP/1.1 200 OK
 * {
 *     "idx": 4,
 *     "poiId": "10067845",
 *     "name": "더현대서울",
 *     "x": 37.52601356,
 *     "y": 126.92827674,
 *     "population": {
 *         "idx": 4,
 *         "level": "VERY_RELAXATION",
 *         "createdDate": "2022-12-19T13:30:02.316Z",
 *         "updatedDate": "2023-09-29T07:00:00.160Z"
 *     },
 *     "cctvs": [
 *         {
 *             "idx": 59,
 *             "src": "https://data.seoul.go.kr/test",
 *             "cctvname": "test"
 *         }
 *     ],
 *     "location": {
 *         "idx": 2,
 *         "name": "영등포구",
 *         "ktPlaces": [
 *             {
 *                 "idx": 48,
 *                 "name": "여의도",
 *                 "categories": [
 *                     {
 *                         "idx": 6,
 *                         "type": "지하철"
 *                     },
 *                     {
 *                         "idx": 9,
 *                         "type": "불꽃축제"
 *                     }
 *                 ],
 *                 "population": {
 *                     "idx": 48,
 *                     "level": "RELAXATION",
 *                     "message": "사람이 몰려있을 가능성이 낮고 붐빔은 거의 느껴지지 않아요. 도보 이동이 자유로워요.",
 *                     "male": 46,
 *                     "female": 54,
 *                     "zeroGen": 1,
 *                     "teenage": 9,
 *                     "twenties": 26,
 *                     "thirties": 23,
 *                     "forties": 17,
 *                     "fifties": 12,
 *                     "sixties": 7,
 *                     "seventies": 6,
 *                     "resident": 12,
 *                     "nonResident": 88,
 *                     "createdDate": "2023-04-11T14:25:54.491Z",
 *                     "updatedDate": "2023-09-30T09:26:15.978Z"
 *                 }
 *             },
 *         ],
 *         "sktPlaces": [
 *             {
 *                 "idx": 4,
 *                 "name": "더현대서울",
 *                 "categories": [
 *                     {
 *                         "idx": 2,
 *                         "type": "쇼핑몰"
 *                     },
 *                     {
 *                         "idx": 8,
 *                         "type": "복합문화공간"
 *                     }
 *                 ],
 *                 "population": {
 *                     "idx": 4,
 *                     "level": "VERY_RELAXATION",
 *                     "createdDate": "2022-12-19T13:30:02.316Z",
 *                     "updatedDate": "2023-09-29T07:00:00.160Z"
 *                 }
 *             }
 *         ]
 *     }
 * }
 */
