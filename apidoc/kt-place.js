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
            "idx": 32,
            "name": "망원한강공원",
            "x": 37.55250491995003,
            "y": 126.899273050949,
            "categories": [
                {
                    "idx": 42,
                    "type": "공원"
                },
                {
                    "idx": 79,
                    "type": "한강"
                }
            ],
            "populations": [
                {
                    "idx": 32,
                    "level": "RELAXATION",
                    "message": "사람이 몰려있을 가능성이 낮고 붐빔은 거의 느껴지지 않아요. 도보 이동이 자유로워요.",
                    "male": 52,
                    "female": 48,
                    "zeroGen": 0,
                    "teenage": 4,
                    "twenties": 19,
                    "thirties": 25,
                    "forties": 18,
                    "fifties": 16,
                    "sixties": 10,
                    "seventies": 8,
                    "resident": 49,
                    "nonResident": 51,
                    "createdDate": "2022-12-17T15:15:00.363Z",
                    "updatedDate": "2022-12-21T14:30:24.690Z"
                }
            ]
        },
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
 * @apiSuccess {object} roadTraffic 도로소통현황
 * @apiSuccess {number} roadTraffic.idx 도로소통현황 idx
 * @apiSuccess {string} roadTraffic.type 도로소통현황 상태
 * @apiSuccess {string} roadTraffic.info 도로소통현황 상세 정보
 * @apiSuccess {number} roadTraffic.avgSpeed 도로소통현황 평균 속도
 * @apiSuccess {object} location 주변 지역
 * @apiSuccess {number} location.idx 지역 인덱스 번호
 * @apiSuccess {string} location.name 지역 이름
 * @apiSuccess {ktPlace[]} location.ktPlaces kt 장소 리스트
 * @apiSuccess {sktPlace[]} location.sktPlaces skt 장소 리스트
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
            "male": 50,
            "female": 50,
            "zeroGen": 0,
            "teenage": 3,
            "twenties": 26,
            "thirties": 27,
            "forties": 19,
            "fifties": 14,
            "sixties": 8,
            "seventies": 3,
            "resident": 27,
            "nonResident": 73,
            "createdDate": "2022-12-17T14:13:01.824Z",
            "updatedDate": "2022-12-21T14:31:00.029Z"
        }
    ],
    "accidents": [],
    "cctvs": [
        {
            "idx": 1,
            "src": "/SeoulRtd/cctv?src=http://210.179.218.52:1935/live/135.stream/playlist.m3u8&cctvname=L010112",
            "cctvname": "동대문운동장"
        }
    ],
    "roadTraffic": {
        "idx": 2,
        "type": "서행",
        "info": "해당 장소로 이동·진입시 시간이 다소 소요될 수 있어요.",
        "avgSpeed": 17
    },
    "locations": {
        "idx": 6,
        "name": "중구",
        "ktPlaces": [
            {
                "idx": 2,
                "name": "동대문 관광특구",
                "categories": [
                    {
                        "idx": 3,
                        "type": "골목 및 거리"
                    }
                ],
                "populations": [
                    {
                        "idx": 2,
                        "level": "NORMAL",
                        "message": "사람이 몰려있을 수 있지만 크게 붐비지는 않아요. 도보 이동에 큰 제약이 없어요.",
                        "male": 50,
                        "female": 50,
                        "zeroGen": 0,
                        "teenage": 3,
                        "twenties": 26,
                        "thirties": 27,
                        "forties": 19,
                        "fifties": 14,
                        "sixties": 8,
                        "seventies": 3,
                        "resident": 27,
                        "nonResident": 73,
                        "createdDate": "2022-12-17T14:13:01.824Z",
                        "updatedDate": "2022-12-21T14:31:00.029Z"
                    }
                ]
            },
        ],
        "sktPlaces": [
            {
                "idx": 7,
                "name": "신세계백화점본점신관",
                "categories": [
                    {
                        "idx": 61,
                        "type": "쇼핑몰"
                    },
                    {
                        "idx": 62,
                        "type": "크리스마스 핫플"
                    }
                ],
                "populations": [
                    {
                        "idx": 7,
                        "level": "VERY_RELAXATION",
                        "createdDate": "2022-12-17T10:16:00.823Z",
                        "updatedDate": "2022-12-21T14:30:00.773Z"
                    }
                ]
            },
        ]
    }
}
 */
