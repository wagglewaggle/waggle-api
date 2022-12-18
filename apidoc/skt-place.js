/**
 * @api {get} /api/skt-place 모든 장소 조회
 * @apiDescription skt 통신사가 제공하는 모든 장소 확인
 * @apiGroup SKT Place
 *
 * @apiQuery {string="RELAXATION","NORMAL","CROWDED","VERY_CROWDED"} [level] 혼잡도 level</br>여유 = 'RELAXATION'</br>보통 = 'NORMAL'</br>붐빔 = 'CROWDED'</br>매우 붐빔 = 'VERY_CROWDED'
 * @apiQuery {boolean="false","true"} populationSort 혼잡도 정렬 순</br>false: 오름차순</br>true: 내림차순
 * @apiQuery {string="테마파크","쇼핑몰","공원","골목 및 거리","궁궐","지하철","마을","크리스마스 핫플레이스"} [category] 카테고리
 *
 * @apiSuccess {array} list response 결과
 * @apiSuccess {number} list.idx 장소 idx
 * @apiSuccess {string} list.poiId 장소 poiId
 * @apiSuccess {string} list.name 장소 이름
 * @apiSuccess {number} list.x x좌표
 * @apiSuccess {number} list.y y좌표
 * @apiSuccess {array} list.categories 장소 카테고리 목록
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
    "list": [
        {
            "idx": 19,
            "poiId": "387701",
            "name": "에버랜드",
            "x": 37.29260112,
            "y": 127.20342498,
            "categories": [
                {
                    "idx": 76,
                    "type": "크리스마스 핫플레이스"
                }
            ],
            "populations": [
                {
                    "idx": 19,
                    "level": "VERY_RELAXATION",
                    "createdDate": "2022-12-17T20:30:07.094Z",
                    "updatedDate": "2022-12-17T20:30:07.094Z"
                }
            ]
        }
    ],
    "count": 7
}
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
 *
 * @apiSuccessExample Response (example):
 * HTTP/1.1 200 OK
 * {
    "idx": 1,
    "poiId": "5799875",
    "name": "롯데월드몰",
    "x": 37.51385147,
    "y": 127.10448326,
    "populations": [
        {
            "idx": 1,
            "level": "VERY_CROWDED",
            "createdDate": "2022-12-17T20:30:00.452Z",
            "updatedDate": "2022-12-18T15:30:00.000Z"
        }
    ]
}
 */
