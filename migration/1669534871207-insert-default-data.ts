import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertDefaultData1669534871207 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO exit.province (idx, name) values (1, \'서울특별시\')`);
    await queryRunner.query(`INSERT INTO exit.province (idx, name) values (2, \'부산광역시\')`);
    await queryRunner.query(`INSERT INTO exit.province (idx, name) values (3, \'대구광역시\')`);
    await queryRunner.query(`INSERT INTO exit.province (idx, name) values (4, \'인천광역시\')`);
    await queryRunner.query(`INSERT INTO exit.province (idx, name) values (5, \'광주광역시\')`);
    await queryRunner.query(`INSERT INTO exit.province (idx, name) values (6, \'대전광역시\')`);
    await queryRunner.query(`INSERT INTO exit.province (idx, name) values (7, \'울산광역시\')`);
    await queryRunner.query(`INSERT INTO exit.province (idx, name) values (8, \'세종특별자치시\')`);
    await queryRunner.query(`INSERT INTO exit.province (idx, name) values (9, \'경기도\')`);
    await queryRunner.query(`INSERT INTO exit.province (idx, name) values (10, \'충청북도\')`);
    await queryRunner.query(`INSERT INTO exit.province (idx, name) values (11, \'충청남도\')`);
    await queryRunner.query(`INSERT INTO exit.province (idx, name) values (12, \'전라북도\')`);
    await queryRunner.query(`INSERT INTO exit.province (idx, name) values (13, \'전라남도\')`);
    await queryRunner.query(`INSERT INTO exit.province (idx, name) values (14, \'경상북도\')`);
    await queryRunner.query(`INSERT INTO exit.province (idx, name) values (15, \'경상남도\')`);
    await queryRunner.query(`INSERT INTO exit.province (idx, name) values (16, \'제주특별자치도\')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM exit.province`);
  }
}
