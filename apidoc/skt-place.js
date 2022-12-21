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
 * @apiSuccess {object} location 주변 지역
 * @apiSuccess {number} location.idx 지역 인덱스 번호
 * @apiSuccess {string} location.name 지역 이름
 * @apiSuccess {ktPlace[]} location.ktPlaces kt 장소 리스트
 * @apiSuccess {sktPlace[]} location.sktPlaces skt 장소 리스트
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
            "level": "RELAXATION",
            "createdDate": "2022-12-17T10:16:00.220Z",
            "updatedDate": "2022-12-21T14:30:00.029Z"
        }
    ],
    "location": {
        "idx": 1,
        "name": "송파구",
        "ktPlaces": [
            {
                "idx": 39,
                "name": "잠실종합운동장",
                "categories": [
                    {
                        "idx": 49,
                        "type": "공원"
                    }
                ],
                "populations": [
                    {
                        "idx": 39,
                        "level": "RELAXATION",
                        "message": "사람이 몰려있을 가능성이 낮고 붐빔은 거의 느껴지지 않아요. 도보 이동이 자유로워요.",
                        "male": 58,
                        "female": 42,
                        "zeroGen": 0,
                        "teenage": 7,
                        "twenties": 11,
                        "thirties": 20,
                        "forties": 28,
                        "fifties": 21,
                        "sixties": 10,
                        "seventies": 4,
                        "resident": 16,
                        "nonResident": 84,
                        "createdDate": "2022-12-17T15:15:00.010Z",
                        "updatedDate": "2022-12-21T14:30:24.691Z"
                    }
                ]
            },
        ],
        "sktPlaces": [
            {
                "idx": 1,
                "name": "롯데월드몰",
                "categories": [
                    {
                        "idx": 51,
                        "type": "쇼핑몰"
                    },
                    {
                        "idx": 52,
                        "type": "크리스마스 핫플"
                    }
                ],
                "populations": [
                    {
                        "idx": 1,
                        "level": "RELAXATION",
                        "createdDate": "2022-12-17T10:16:00.220Z",
                        "updatedDate": "2022-12-21T14:30:00.029Z"
                    }
                ]
            },
        ]
    }
}
 */
