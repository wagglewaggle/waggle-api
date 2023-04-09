import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertNewPlace1680424674376 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `insert into extra_place (name, x, y, address, status, locationIdx, provinceIdx) values ('북악팔각정', 37.6023957344207, 126.98051063172, '서울특별시 종로구 평창동 북악산로 267', 'ACTIVATED', 4, 1)`,
    );
    await queryRunner.query(
      `insert into extra_place (name, x, y, address, status, locationIdx, provinceIdx) values ('을지로역', 37.5663707894301, 126.991035361285, '서울특별시 중구 을지로 지하 106', 'ACTIVATED', 6, 1)`,
    );
    await queryRunner.query(
      `insert into extra_place (name, x, y, address, status, locationIdx, provinceIdx) values ('삼각지역', 37.535603679694, 126.973999655131, '서울특별시 용산구 한강대로 지하 180', 'ACTIVATED', 9, 1)`,
    );
    await queryRunner.query(
      `insert into extra_place (name, x, y, address, status, locationIdx, provinceIdx) values ('양재 시민의숲', 37.4708999894627, 127.035518979109, '서울특별시 서초구 매헌로 99', 'ACTIVATED', 8, 1)`,
    );
    await queryRunner.query(
      `insert into extra_place (name, x, y, address, status, locationIdx, provinceIdx) values ('보라매공원', 37.4932596918729, 126.920578649504, '서울특별시 동작구 신대방동 722', 'ACTIVATED', null, 1)`,
    );
    await queryRunner.query(
      `insert into extra_place (name, x, y, address, status, locationIdx, provinceIdx) values ('중랑 장미공원', 37.6144346894257, 127.072708982546, '서울 중랑구 묵동 375', 'ACTIVATED', null, 1)`,
    );
    await queryRunner.query(
      `insert into extra_place (name, x, y, address, status, locationIdx, provinceIdx) values ('이월드', 35.8525093188023, 128.565896401491, '경상북도 대구 달서구 두류공원로 200', 'ACTIVATED', null, 14)`,
    );
    await queryRunner.query(
      `insert into extra_place (name, x, y, address, status, locationIdx, provinceIdx) values ('팔당 카페거리', 37.5531291823212, 127.237226470675, '경기도 남양주시 와부읍 팔당리', 'ACTIVATED', null, 9)`,
    );
    await queryRunner.query(
      `insert into extra_place (name, x, y, address, status, locationIdx, provinceIdx) values ('경포해변', 37.8033267771386, 128.910398957383, '강원 강릉시 창해로 514', 'ACTIVATED', null, null)`,
    );
    await queryRunner.query(
      `insert into extra_place (name, x, y, address, status, locationIdx, provinceIdx) values ('경주보문단지', 35.8427690958241, 129.286529277678, '경상북도 경주시 보문로 424-33', 'ACTIVATED', null, 14)`,
    );
    await queryRunner.query(
      `insert into extra_place (name, x, y, address, status, locationIdx, provinceIdx) values ('경주월드', 35.8359043276909, 129.283867396441, '경상북도 경주시 보문로 544', 'ACTIVATED', null, 14)`,
    );
    await queryRunner.query(
      `insert into extra_place (name, x, y, address, status, locationIdx, provinceIdx) values ('광안리 해수욕장', 35.1537605292804, 129.118590865739, '경상남도 부산시 수영구 광안해변로 219', 'ACTIVATED', null, 16)`,
    );
    await queryRunner.query(
      `insert into extra_place (name, x, y, address, status, locationIdx, provinceIdx) values ('전주 한옥마을', 35.8182427191625, 127.153673509534, '전라북도 전주시 완산구 기린대로 99', 'ACTIVATED', null, 12)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
