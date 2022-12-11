import { MigrationInterface, QueryRunner } from "typeorm"

export class insertKtPlace1670748657053 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (1, '홍대 관광특구', 1, 37.55458049807929, 126.92187309265138)`);
        await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (2, '종로·청계 관광특구', 1, 37.56958274658616, 126.99620246887208)`);
        await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (3, '강남 MICE 관광특구', 1, 37.51095136635107, 127.06016778945924)`);
        await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (4, '광화문·덕수궁', 1, 37.570348086429135, 126.97579622268678)`);
        await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (5, '창덕궁·종묘', 1, 37.57927647015724, 126.99345588684083)`);
        await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (6, '경복궁·서촌마을', 1, 37.57992267352886, 126.97302818298341)`);
        await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (7, '고속터미널역', 1, 37.50465332371542, 127.00598716735841)`);
        await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (8, '강남역', 1, 37.49852498844754, 127.02851772308351)`);
        await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (9, '역삼역', 1, 37.50114661565296, 127.0383882522583)`);
        await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (10, '신림역', 1, 37.48490466486019, 126.9292974472046)`);
        await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (11, '선릉역', 1, 37.505538486122944, 127.05044746398927)`);
        await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (12, '용산역', 1, 37.530087866273625, 126.96049481687398)`);
        await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (13, '서울숲공원', 1, 37.54369262152499, 127.0386028289795)`);
        await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (14, '망원한강공원', 1, 37.55250491995003, 126.899273050949)`);
        await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (15, '이촌한강공원', 1, 37.51993752432214, 126.96361949667336)`);
        await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (16, '반포한강공원', 1, 37.5092828889319, 126.99413230642679)`);
        await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (17, '뚝섬한강공원', 1, 37.52865072781799, 127.07272103056314)`);
        await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (18, '잠실한강공원', 1, 37.51796329776014, 127.085123565048)`);
        await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (19, '남산공원', 1, 37.551280278481535, 126.99401378631593)`);
        await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (20, '북서울꿈의숲', 1, 37.62167592099053, 127.04182147979738)`);
        await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (21, '월드컵공원', 1, 37.570195019089674, 126.8833351135254)`);
        await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (22, '서울대공원', 1, 37.4291716932771, 127.01650142669679)`);
        await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (23, '국립중앙박물관·용산가족공원', 1, 37.52266090859854, 126.98101043701173)`);
        await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (24, '잠실종합운동장', 1, 37.5145767553017, 127.07385778427125)`);
        await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (25, '북촌한옥마을', 1, 37.58342567840362, 126.98498010635377)`);
        await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (26, '낙산공원·이화마을', 1, 37.58034780426735, 127.00729608535768)`);
        await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (27, '쌍문동 맛집거리', 1, 37.64777678936475, 127.03330278396608)`);
        await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (28, '인사동·익선동', 1, 37.57342802690296, 126.98714524564596)`);
        await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (29, '성수카페거리', 1, 37.54386275682704, 127.05669164657594)`);
        await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (30, '압구정로데오거리', 1, 37.525485900907675, 127.0386028289795)`);
        await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (31, '가로수길', 1, 37.52119731630126, 127.02392578125001)`);
        await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (32, '수유리 먹자골목', 1, 37.64159225623666, 127.02598571777345)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
