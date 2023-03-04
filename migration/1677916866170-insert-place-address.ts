import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertPlaceAddress1677916866170 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '서울 강남구 삼성동 159' WHERE idx = 1`);
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '서울 중구 을지로7가 143' WHERE idx = 2`);
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '서울 중구 소공동 1' WHERE idx = 3`);
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '서울 용산구 이태원동 126-3' WHERE idx = 4`);
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '서울 종로구 예지동 47-8' WHERE idx = 5`);
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '서울 마포구 서교동 417' WHERE idx = 6`);
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '서울 종로구 창성동 117-6' WHERE idx = 7`);
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '서울 종로구 신문로1가 5-4' WHERE idx = 8`);
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '서울 종로구 와룡동 2-1' WHERE idx = 9`);
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '서울 강남구 역삼동 822-1' WHERE idx = 10`);
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '서울 광진구 자양동 5-69' WHERE idx = 11`);
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '서울 서초구 반포동 19-4' WHERE idx = 12`);
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '서울 서초구 서초동 1574-13' WHERE idx = 13`);
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '서울 강남구 삼성동 141-26' WHERE idx = 14`);
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '서울 관악구 신림동 1433-225' WHERE idx = 15`);
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '서울 서대문구 창천동 13-40' WHERE idx = 16`);
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '서울 강남구 역삼동 804' WHERE idx = 17`);
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '서울 용산구 한강로3가 40-1' WHERE idx = 18`);
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '서울 성동구 행당동 1-4' WHERE idx = 19`);
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '서울 마포구 상암동 1706' WHERE idx = 20`);
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '서울 종로구 동숭동 50-111' WHERE idx = 21`);
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '서울 종로구 가회동 1-20' WHERE idx = 22`);
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '서울 강남구 신사동 554-15' WHERE idx = 23`);
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '서울 성동구 성수동2가 315-1' WHERE idx = 24`);
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '서울 강북구 수유동 176-67' WHERE idx = 25`);
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '서울 도봉구 쌍문동 96-22' WHERE idx = 26`);
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '서울 강남구 신사동 668-27' WHERE idx = 27`);
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '서울 종로구 낙원동 280-4' WHERE idx = 28`);
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '서울 용산구 용산동6가 168-6' WHERE idx = 29`);
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '서울 중구 장충동2가 산 14-21' WHERE idx = 30`);
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '서울 광진구 자양동 435' WHERE idx = 31`);
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '서울 마포구 망원동 205-5' WHERE idx = 32`);
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '서울 서초구 반포동 115-5' WHERE idx = 33`);
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '서울 강북구 번동 90' WHERE idx = 34`);
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '경기 과천시 막계동 558' WHERE idx = 35`);
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '서울 성동구 성수동1가 720' WHERE idx = 36`);
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '서울 마포구 상암동 481-63' WHERE idx = 37`);
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '서울 용산구 이촌동 361-1' WHERE idx = 38`);
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '서울 송파구 잠실동 10' WHERE idx = 39`);
    await queryRunner.query(`UPDATE \`exit\`.kt_place SET address = '서울 송파구 잠실동 1-1' WHERE idx = 40`);

    await queryRunner.query(`UPDATE \`exit\`.skt_place SET address = '서울 송파구 신천동 29' WHERE idx = 1`);
    await queryRunner.query(`UPDATE \`exit\`.skt_place SET address = '서울 송파구 잠실동 40-1' WHERE idx = 2`);
    await queryRunner.query(`UPDATE \`exit\`.skt_place SET address = '서울 영등포구 영등포동4가 442' WHERE idx = 3`);
    await queryRunner.query(`UPDATE \`exit\`.skt_place SET address = '서울 영등포구 여의도동 22' WHERE idx = 4`);
    await queryRunner.query(`UPDATE \`exit\`.skt_place SET address = '서울 영등포구 여의도동 23' WHERE idx = 5`);
    await queryRunner.query(`UPDATE \`exit\`.skt_place SET address = '서울 광진구 능동 18' WHERE idx = 6`);
    await queryRunner.query(`UPDATE \`exit\`.skt_place SET address = '서울 중구 충무로1가 54' WHERE idx = 7`);
    await queryRunner.query(`UPDATE \`exit\`.skt_place SET address = '서울 중구 소공동 1' WHERE idx = 8`);
    await queryRunner.query(`UPDATE \`exit\`.skt_place SET address = '서울 강남구 삼성동 159-7' WHERE idx = 9`);
    await queryRunner.query(`UPDATE \`exit\`.skt_place SET address = '서울 구로구 신도림동 692' WHERE idx = 10`);
    await queryRunner.query(`UPDATE \`exit\`.skt_place SET address = '서울 서대문구 창천동 30-33' WHERE idx = 11`);
    await queryRunner.query(`UPDATE \`exit\`.skt_place SET address = '서울 강남구 압구정동 429' WHERE idx = 12`);
    await queryRunner.query(`UPDATE \`exit\`.skt_place SET address = '경기 수원시 영통구 하동 1017-2' WHERE idx = 13`);
    await queryRunner.query(`UPDATE \`exit\`.skt_place SET address = '서울 강남구 압구정동 494' WHERE idx = 14`);
    await queryRunner.query(`UPDATE \`exit\`.skt_place SET address = '서울 서초구 반포동 19-3' WHERE idx = 15`);
    await queryRunner.query(`UPDATE \`exit\`.skt_place SET address = '경기 하남시 신장동 616' WHERE idx = 16`);
    await queryRunner.query(`UPDATE \`exit\`.skt_place SET address = '경기 고양시 덕양구 동산동 370' WHERE idx = 17`);
    await queryRunner.query(`UPDATE \`exit\`.skt_place SET address = '경기 안성시 공도읍 진사리 354' WHERE idx = 18`);
    await queryRunner.query(`UPDATE \`exit\`.skt_place SET address = '경기 용인시 처인구 포곡읍 전대리 310' WHERE idx = 19`);
    await queryRunner.query(`UPDATE \`exit\`.skt_place SET address = '경기 성남시 분당구 백현동 541' WHERE idx = 20`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
