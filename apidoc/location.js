/**
 * @api {get} /api/location/:name 주변 장소 조회
 * @apiDescription 주변 장소 조회
 * @apiGroup Location
 *
 * @apiParam {string="송파구","영등포구","강남구","종로구","마포구","중구","서대문구","서초구","용산구","광진구","성동구","강북구"} name 지역 이름
 *
 * @apiSuccess {number} idx 장소 idx
 * @apiSuccess {string} name 장소 이름
 * @apiSuccess {array} ktPlaces kt 장소 목록
 * @apiSuccess {number} ktPlaces.idx 장소 idx
 * @apiSuccess {string} ktPlaces.name 장소 이름
 * @apiSuccess {number} ktPlaces.x x좌표
 * @apiSuccess {number} ktPlaces.y y좌표
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
 * @apiSuccess {array} sktPlaces skt 장소 목록
 * @apiSuccess {number} sktPlaces.idx 장소 idx
 * @apiSuccess {string} sktPlaces.poiId 장소 poiId
 * @apiSuccess {string} sktPlaces.name 장소 이름
 * @apiSuccess {number} sktPlaces.x x좌표
 * @apiSuccess {number} sktPlaces.y y좌표
 * @apiSuccess {object} sktPlaces.populations 혼잡도
 * @apiSuccess {number} sktPlaces.populations.idx 혼잡도 idx
 * @apiSuccess {string} sktPlaces.populations.level 혼잡도 level</br>매우 여유로음 = 'VERY_RELAXATION'</br>여유 = 'RELAXATION'</br>보통 = 'NORMAL'</br>붐빔 = 'CROWDED'</br>매우 붐빔 = 'VERY_CROWDED'
 * @apiSuccess {Date} sktPlaces.populations.createdDate 생성 날짜
 * @apiSuccess {Date} sktPlaces.populations.updatedDate 업데이트 날짜
 *
 * @apiSuccessExample Response (example):
 * HTTP/1.1 200 OK
 * {
    "idx": 10,
    "name": "광진구",
    "ktPlaces": [
        {
            "idx": 11,
            "name": "건대입구역",
            "x": 37.53967731569061,
            "y": 127.06872940063478,
            "populations": [
                {
                    "idx": 11,
                    "level": "CROWDED",
                    "message": "사람들이 몰려있을 가능성이 크고 붐빈다고 느낄 수 있어요. 인구밀도가 높은 구간에서는 도보 이동시 부딪힘이 발생할 수 있어요.",
                    "male": 44,
                    "female": 56,
                    "zeroGen": 0,
                    "teenager": 12,
                    "twenties": 34,
                    "thirties": 18,
                    "forties": 13,
                    "fifties": 11,
                    "sixties": 7,
                    "seventies": 4,
                    "resident": 11,
                    "nonResident": 89,
                    "createdDate": "2022-12-17T20:25:18.698Z",
                    "updatedDate": "2022-12-18T16:16:58.000Z"
                }
            ]
        }
    ],
    "sktPlaces": [
        {
            "idx": 6,
            "poiId": "182018",
            "name": "어린이대공원",
            "x": 37.54976354,
            "y": 127.08067886,
            "populations": [
                {
                    "idx": 6,
                    "level": "VERY_RELAXATION",
                    "createdDate": "2022-12-17T20:30:03.990Z",
                    "updatedDate": "2022-12-17T20:30:03.990Z"
                }
            ]
        }
    ]
}
 */
