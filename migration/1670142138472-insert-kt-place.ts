import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertKtPlace1670142138472 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (1, '홍대 관광특구', 1, 37.554580498079290, 26.921873092651380);`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (2, '종로·청계 관광특구', 1, 37.569582746586160, 26.996202468872080);`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (3, '강남 MICE 관광특구', 1, 37.510951366351070, 27.060167789459240);`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (4, '광화문·덕수궁', 1, 37.570348086429135, 26.975796222686780);`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (5, '창덕궁·종묘', 1, 37.579276470157240, 26.993455886840830);`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (6, '경복궁·서촌마을', 1, 37.579922673528860, 26.973028182983410);`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (7, '고속터미널역', 1, 37.504653323715420, 27.005987167358410);`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (8, '강남역', 1, 37.498524988447540, 27.028517723083510);`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (9, '역삼역', 1, 37.501146615652960, 27.038388252258300);`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (10, '신림역', 1, 37.484904664860190, 26.929297447204600);`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (11, '선릉역', 1, 37.505538486122944, 27.050447463989270);`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (12, '용산역', 1, 37.530087866273625, 26.960494816873980);`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (13, '서울숲공원', 1, 37.543692621524990, 27.038602828979500);`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (14, '망원한강공원', 1, 37.552504919950030, 26.899273050949000);`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (15, '이촌한강공원', 1, 37.519937524322140, 26.963619496673360);`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (16, '반포한강공원', 1, 37.509282888931900, 26.994132306426790);`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (17, '뚝섬한강공원', 1, 37.528650727817990, 27.072721030563140);`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (18, '잠실한강공원', 1, 37.517963297760140, 27.085123565048000);`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (19, '남산공원', 1, 37.551280278481535, 26.994013786315930);`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (20, '북서울꿈의숲', 1, 37.621675920990530, 27.041821479797380);`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (21, '월드컵공원', 1, 37.570195019089674, 26.883335113525400);`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (22, '서울대공원', 1, 37.429171693277100, 27.016501426696790);`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (23, '국립중앙박물관·용산가족공원', 1, 37.522660908598540, 26.981010437011730);`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (24, '잠실종합운동장', 1, 37.514576755301700, 27.073857784271250);`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (25, '북촌한옥마을', 1, 37.583425678403620, 26.984980106353770);`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (26, '낙산공원·이화마을', 1, 37.580347804267350, 27.007296085357680);`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (27, '쌍문동 맛집거리', 1, 37.647776789364750, 27.033302783966080);`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (28, '인사동·익선동', 1, 37.573428026902960, 26.987145245645960);`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (29, '성수카페거리', 1, 37.543862756827040, 27.056691646575940);`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (30, '압구정로데오거리', 1, 37.525485900907675, 27.038602828979500);`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (31, '가로수길', 1, 37.521197316301260, 27.023925781250010);`);
    await queryRunner.query(`INSERT INTO \`exit\`.kt_place (idx, name, provinceIdx, x, y) VALUES (32, '수유리 먹자골목', 1, 37.641592256236660, 27.025985717773450);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
