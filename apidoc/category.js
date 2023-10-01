/**
 * @api {get} /api/category 카테고리 목록 조회
 * @apiDescription 카테고리 목록 조회
 * @apiGroup Category
 *
 * @apiSuccess {array} list response 결과
 * @apiSuccess {number} list.idx 카테고리 idx
 * @apiSuccess {string} list.type 카테고리 이름
 *
 * @apiSuccessExample Response (example):
 * HTTP/1.1 200 OK
 * {
 *   "list": [
 *     {
 *       "idx": 1,
 *       "type": "놀이공원"
 *     },
 *     {
 *       "idx": 2,
 *       "type": "쇼핑몰"
 *     },
 *     {
 *       "idx": 3,
 *       "type": "공원"
 *     },
 *     {
 *       "idx": 4,
 *       "type": "한강"
 *     },
 *     {
 *       "idx": 5,
 *       "type": "관광 명소"
 *     },
 *     {
 *       "idx": 6,
 *       "type": "지하철"
 *     },
 *     {
 *       "idx": 7,
 *       "type": "거리"
 *     },
 *     {
 *       "idx": 8,
 *       "type": "복합문화공간"
 *     },
 *     {
 *       "idx": 9,
 *       "type": "불꽃축제"
 *     },
 *     {
 *       "idx": 10,
 *       "type": "경기장"
 *     }
 *   ]
 * }
 */
