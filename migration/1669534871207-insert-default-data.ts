import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertDefaultData1669534871207 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO exit.province (idx, name) values (1, \'서울특별시\')`,
    );
    await queryRunner.query(
      `INSERT INTO exit.province (idx, name) values (2, \'인천광역시\')`,
    );
    await queryRunner.query(
      `INSERT INTO exit.province (idx, name) values (3, \'경기도\')`,
    );
    await queryRunner.query(
      `INSERT INTO exit.province (idx, name) values (4, \'강원도\')`,
    );
    await queryRunner.query(
      `INSERT INTO exit.province (idx, name) values (5, \'충청남도\')`,
    );
    await queryRunner.query(
      `INSERT INTO exit.province (idx, name) values (6, \'충청북도\')`,
    );
    await queryRunner.query(
      `INSERT INTO exit.province (idx, name) values (7, \'전라북도\')`,
    );
    await queryRunner.query(
      `INSERT INTO exit.province (idx, name) values (8, \'전라남도\')`,
    );
    await queryRunner.query(
      `INSERT INTO exit.province (idx, name) values (9, \'경상북도\')`,
    );
    await queryRunner.query(
      `INSERT INTO exit.province (idx, name) values (10, \'경상남도\')`,
    );
    await queryRunner.query(
      `INSERT INTO exit.province (idx, name) values (11, \'제주도\')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM exit.province`);
  }
}
