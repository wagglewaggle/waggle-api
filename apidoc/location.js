/**
 * @api {get} /api/location/:name 주변 장소 조회
 * @apiDescription 주변 장소 조회
 * @apiGroup Location
 *
 * @apiParam {string="송파구","영등포구","강남구","종로구","마포구","중구","서대문구","서초구","용산구","광진구","성동구","강북구"} name 지역 이름
 *
 * @apiSuccess {number} idx 장소 idx
 * @apiSuccess {string} name 장소 이름
 * @apiSuccess {object[]} ktPlaces kt 장소 목록
 * @apiSuccess {number} ktPlaces.idx 장소 idx
 * @apiSuccess {string} ktPlaces.name 장소 이름
 * @apiSuccess {object[]} ktPlaces.categories 카테고리
 * @apiSuccess {number} ktPlaces.categories.idx 카테고리 idx
 * @apiSuccess {number} ktPlaces.categories.type 카테고리 타입
 * @apiSuccess {object} ktPlaces.populations 혼잡도
 * @apiSuccess {number} ktPlaces.populations.idx 혼잡도 idx
 * @apiSuccess {string} ktPlaces.populations.level 혼잡도 level</br>여유 = 'RELAXATION'</br>보통 = 'NORMAL'</br>붐빔 = 'CROWDED'</br>매우 붐빔 = 'VERY_CROWDED'
 * @apiSuccess {string} ktPlaces.populations.message 혼잡도 message
 * @apiSuccess {number} ktPlaces.populations.male 남성 비율
 * @apiSuccess {number} ktPlaces.populations.female 여성 비율
 * @apiSuccess {number} ktPlaces.populations.zeroGen 0~10세 인구 비율
 * @apiSuccess {number} ktPlaces.populations.teenage 10대 인구 비율
 * @apiSuccess {number} ktPlaces.populations.twenties 20대 인구 비율
 * @apiSuccess {number} ktPlaces.populations.thirties 30대 인구 비율
 * @apiSuccess {number} ktPlaces.populations.forties 40대 인구 비율
 * @apiSuccess {number} ktPlaces.populations.fifties 50대 인구 비율
 * @apiSuccess {number} ktPlaces.populations.sixties 60대 인구 비율
 * @apiSuccess {number} ktPlaces.populations.seventies 70대 인구 비율
 * @apiSuccess {number} ktPlaces.populations.resident 상주 인구 비율
 * @apiSuccess {number} ktPlaces.populations.nonResident 비상주 인구 비율
 * @apiSuccess {Date} ktPlaces.populations.createdDate 생성 날짜
 * @apiSuccess {Date} ktPlaces.populations.updatedDate 업데이트 날짜
 * @apiSuccess {object[]} sktPlaces skt 장소 목록
 * @apiSuccess {number} sktPlaces.idx 장소 idx
 * @apiSuccess {string} sktPlaces.name 장소 이름
 * @apiSuccess {object[]} sktPlaces.categories 카테고리
 * @apiSuccess {number} sktPlaces.categories.idx 카테고리 idx
 * @apiSuccess {number} sktPlaces.categories.type 카테고리 타입
 * @apiSuccess {object} sktPlaces.populations 혼잡도
 * @apiSuccess {number} sktPlaces.populations.idx 혼잡도 idx
 * @apiSuccess {string} sktPlaces.populations.level 혼잡도 level</br>매우 여유로음 = 'VERY_RELAXATION'</br>여유 = 'RELAXATION'</br>보통 = 'NORMAL'</br>붐빔 = 'CROWDED'</br>매우 붐빔 = 'VERY_CROWDED'
 * @apiSuccess {Date} sktPlaces.populations.createdDate 생성 날짜
 * @apiSuccess {Date} sktPlaces.populations.updatedDate 업데이트 날짜
 *
 * @apiSuccessExample Response (example):
 * HTTP/1.1 200 OK
 * {
 *     "idx": 1,
 *     "name": "송파구",
 *     "ktPlaces": [
 *         {
 *             "idx": 40,
 *             "name": "잠실한강공원",
 *             "categories": [
 *                 {
 *                     "idx": 3,
 *                     "type": "공원"
 *                 },
 *                 {
 *                     "idx": 4,
 *                     "type": "한강"
 *                 }
 *             ],
 *             "population": {
 *                 "idx": 40,
 *                 "level": "RELAXATION",
 *                 "message": "사람이 몰려있을 가능성이 낮고 붐빔은 거의 느껴지지 않아요. 도보 이동이 자유로워요.",
 *                 "male": 49,
 *                 "female": 51,
 *                 "zeroGen": 1,
 *                 "teenage": 10,
 *                 "twenties": 14,
 *                 "thirties": 17,
 *                 "forties": 22,
 *                 "fifties": 17,
 *                 "sixties": 12,
 *                 "seventies": 7,
 *                 "resident": 6,
 *                 "nonResident": 94,
 *                 "createdDate": "2022-12-19T13:10:31.752Z",
 *                 "updatedDate": "2023-09-30T09:26:06.034Z"
 *             }
 *         },
 *     ],
 *     "sktPlaces": [
 *         {
 *             "idx": 16,
 *             "name": "스타필드하남",
 *             "categories": [
 *                 {
 *                     "idx": 2,
 *                     "type": "쇼핑몰"
 *                 },
 *                 {
 *                     "idx": 8,
 *                     "type": "복합문화공간"
 *                 }
 *             ],
 *             "population": {
 *                 "idx": 16,
 *                 "level": "RELAXATION",
 *                 "createdDate": "2022-12-19T13:30:04.534Z",
 *                 "updatedDate": "2023-09-29T07:00:00.171Z"
 *             }
 *         },
 *     ]
 * }
 */
