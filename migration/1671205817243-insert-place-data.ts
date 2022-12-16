import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertPlaceData1671205817243 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // location data
    await queryRunner.query(`INSERT INTO \`exit\`.location (idx, name) VALUES (1, '송파구')`);
    await queryRunner.query(`INSERT INTO \`exit\`.location (idx, name) VALUES (2, '영등포구')`);
    await queryRunner.query(`INSERT INTO \`exit\`.location (idx, name) VALUES (3, '강남구')`);
    await queryRunner.query(`INSERT INTO \`exit\`.location (idx, name) VALUES (4, '종로구')`);
    await queryRunner.query(`INSERT INTO \`exit\`.location (idx, name) VALUES (5, '마포구')`);
    await queryRunner.query(`INSERT INTO \`exit\`.location (idx, name) VALUES (6, '중구')`);
    await queryRunner.query(`INSERT INTO \`exit\`.location (idx, name) VALUES (7, '서대문구')`);
    await queryRunner.query(`INSERT INTO \`exit\`.location (idx, name) VALUES (8, '서초구')`);
    await queryRunner.query(`INSERT INTO \`exit\`.location (idx, name) VALUES (9, '용산구')`);
    await queryRunner.query(`INSERT INTO \`exit\`.location (idx, name) VALUES (10, '광진구')`);
    await queryRunner.query(`INSERT INTO \`exit\`.location (idx, name) VALUES (11, '성동구')`);
    await queryRunner.query(`INSERT INTO \`exit\`.location (idx, name) VALUES (12, '강북구')`);

    // kt-place data
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (1, '강남 MICE 관광특구', 1, 37.51095136635107, 127.06016778945924, 3)`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (2, '동대문 관광특구', 1, 37.567269671705716, 127.0113515853882, 6)`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (3, '명동 관광특구', 1, 37.564650367842184, 126.98208332061769, 6)`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (4, '이태원 관광특구', 1, 37.534419660369636, 126.99628829956056, 9)`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (5, '종로·청계 관광특구', 1, 37.56958274658616, 126.99620246887208, 4)`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (6, '홍대 관광특구', 1, 37.55458049807929, 126.92187309265138, 5)`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (7, '경복궁·서촌마을', 1, 37.57992267352886, 126.97302818298341, 4)`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (8, '광화문·덕수궁', 1, 37.570348086429135, 126.97579622268678, 4)`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (9, '창덕궁·종묘', 1, 37.57927647015724, 126.99345588684083, 4)`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (10, '강남역', 1, 37.49852498844754, 127.02851772308351, 3)`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (11, '건대입구역', 1, 37.53967731569061, 127.06872940063478, 10)`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (12, '고속터미널역', 1, 37.50465332371542, 127.00598716735841, 8)`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (13, '교대역', 1, 37.49256640249289, 127.01351881027223, 8)`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (14, '선릉역', 1, 37.505538486122944, 127.05044746398927, 3)`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (15, '신림역', 1, 37.48490466486019, 126.9292974472046, 8)`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (16, '신촌·이대역', 1, 37.55733623958529, 126.93869590759279, 7)`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (17, '역삼역', 1, 37.50114661565296, 127.0383882522583, 3)`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (18, '용산역', 1, 37.530087866273625, 126.96049481687398, 9)`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (19, '왕십리역', 1, 37.562184055994926, 127.03903198242189, 11)`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (20, 'DMC(디지털미디어시티)', 1, 37.57999069461015, 126.89247608184816, 5)`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (21, '낙산공원·이화마을', 1, 37.58034780426735, 127.00729608535768, 4)`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (22, '북촌한옥마을', 1, 37.58342567840362, 126.98498010635377, 4)`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (23, '가로수길', 1, 37.52119731630126, 127.02392578125001, 3)`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (24, '성수카페거리', 1, 37.54386275682704, 127.05669164657594, 11)`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (25, '수유리 먹자골목', 1, 37.64159225623666, 127.02598571777345, 12)`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (26, '쌍문동 맛집거리', 1, 37.64777678936475, 127.03330278396608, 12)`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (27, '압구정로데오거리', 1, 37.525485900907675, 127.0386028289795, 3)`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (28, '인사동·익선동', 1, 37.57342802690296, 126.98714524564596, 4)`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (29, '국립중앙박물관·용산가족공원', 1, 37.52266090859854, 126.98101043701173, 9)`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (30, '남산공원', 1, 37.551280278481535, 126.99401378631593, 6)`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (31, '뚝섬한강공원', 1, 37.52865072781799, 127.07272103056314, 10)`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (32, '망원한강공원', 1, 37.55250491995003, 126.899273050949, 5)`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (33, '반포한강공원', 1, 37.5092828889319, 126.99413230642679, 8)`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (34, '북서울꿈의숲', 1, 37.62167592099053, 127.04182147979738, 12)`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (35, '서울대공원', 1, 37.4291716932771, 127.01650142669679, 8)`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (36, '서울숲공원', 1, 37.54369262152499, 127.0386028289795, 11)`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (37, '월드컵공원', 1, 37.570195019089674, 126.8833351135254, 5)`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (38, '이촌한강공원', 1, 37.51993752432214, 126.96361949667336, 9)`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (39, '잠실종합운동장', 1, 37.5145767553017, 127.07385778427125, 1)`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y, locationIdx) VALUES (40, '잠실한강공원', 1, 37.51796329776014, 127.085123565048, 1)`);

    // skt-place
    await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y, locationIdx) VALUES (5799875, '롯데월드몰', 1, 37.51385147, 127.10448326, 1)`);
    await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y, locationIdx) VALUES (187961, '롯데월드잠실점', 1, 37.51107390, 127.09815059, 1)`);
    await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y, locationIdx) VALUES (1172091, '타임스퀘어', 1, 37.51723636, 126.90347369, 2)`);
    await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y, locationIdx) VALUES (10067845, '더현대서울', 1, 37.52601356, 126.92827674, 2)`);
    await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y, locationIdx) VALUES (2905972, 'IFC몰', 1, 37.52545802, 126.92544368, 2)`);
    await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y, locationIdx) VALUES (182018, '어린이대공원', 1, 37.54976354, 127.08067886, 10)`);
    await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y, locationIdx) VALUES (334736, '신세계백화점본점신관', 1, 37.56031607, 126.98077099, 6)`);
    await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y, locationIdx) VALUES (219475, '롯데백화점본점', 1, 37.56473224, 126.98174300, 6)`);
    await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y, locationIdx) VALUES (187760, '현대백화점무역센터점', 1, 37.50871237, 127.05970971, 3)`);
    await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y, locationIdx) VALUES (6144946, '현대백화점디큐브시티점', 1, 37.50868154, 126.88922523, 2)`);
    await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y, locationIdx) VALUES (366844, '현대백화점신촌점', 1, 37.55603798, 126.93580299, 7)`);
    await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y, locationIdx) VALUES (292664, '현대백화점압구정본점', 1, 37.52737629, 127.02748989, 3)`);
    await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y, locationIdx) VALUES (8354756, '갤러리아백화점광교점', 1, 37.28532156, 127.05727178, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y, locationIdx) VALUES (359817, '갤러리아백화점명품관WEST', 1, 37.52845972, 127.04007205, 6)`);
    await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y, locationIdx) VALUES (214920, '신세계백화점강남점', 1, 37.50501736, 127.00421486, 3)`);
    await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y, locationIdx) VALUES (5411247, '스타필드하남', 1, 37.54557217, 127.22399927, 1)`);
    await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y, locationIdx) VALUES (7633414, '스타필드고양', 1, 37.64705444, 126.89444307, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y, locationIdx) VALUES (8875892, '스타필드안성', 1, 36.99432903, 127.14729952, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y, locationIdx) VALUES (387701, '에버랜드', 1, 37.29260112, 127.20342498, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y, locationIdx) VALUES (5400712, '현대백화점판교점', 1, 37.39261567, 127.11198602, 3)`);

    // category kt-place
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('쇼핑몰', 1, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('크리스마스 핫플레이스', 1, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('골목 및 거리', 2, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('골목 및 거리', 3, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('크리스마스 핫플레이스', 3, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('골목 및 거리', 4, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('공원', 5, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('골목 및 거리', 5, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('크리스마스 핫플레이스', 5, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('골목 및 거리', 6, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('크리스마스 핫플레이스', 6, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('궁궐', 7, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('골목 및 거리', 7, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('궁궐', 8, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('골목 및 거리', 8, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('궁궐', 9, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('지하철', 10, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('지하철', 11, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('지하철', 12, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('지하철', 13, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('지하철', 14, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('지하철', 15, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('지하철', 16, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('지하철', 17, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('지하철', 18, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('지하철', 19, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('지하철', 20, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('공원', 21, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('마을', 21, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('마을', 22, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('골목 및 거리', 23, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('크리스마스 핫플레이스', 23, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('골목 및 거리', 24, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('크리스마스 핫플레이스', 24, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('골목 및 거리', 25, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('골목 및 거리', 26, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('골목 및 거리', 27, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('골목 및 거리', 28, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('공원', 29, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('공원', 30, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('공원', 31, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('공원', 32, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('공원', 33, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('테마파크', 34, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('테마파크', 35, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('공원', 36, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('공원', 37, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('공원', 38, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('공원', 39, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('공원', 40, null)`);

    // category skt-place
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('쇼핑몰', null, 1)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('크리스마스 핫플레이스', null, 1)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('테마파크', null, 2)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('크리스마스 핫플레이스', null, 2)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('쇼핑몰', null, 3)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('크리스마스 핫플레이스', null, 3)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('쇼핑몰', null, 4)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('크리스마스 핫플레이스', null, 4)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('쇼핑몰', null, 5)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('테마파크', null, 6)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('쇼핑몰', null, 7)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('크리스마스 핫플레이스', null, 7)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('쇼핑몰', null, 8)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('쇼핑몰', null, 9)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('크리스마스 핫플레이스', null, 9)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('쇼핑몰', null, 10)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('쇼핑몰', null, 11)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('쇼핑몰', null, 12)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('쇼핑몰', null, 13)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('쇼핑몰', null, 14)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('쇼핑몰', null, 15)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('쇼핑몰', null, 16)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('쇼핑몰', null, 17)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('쇼핑몰', null, 18)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('테마파크', null, 19)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('크리스마스 핫플레이스', null, 19)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('쇼핑몰', null, 20)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
