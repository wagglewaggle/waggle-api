import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateCategory1671461994079 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM \`exit\`.category WHERE idx = 7`);
    await queryRunner.query(`UPDATE \`exit\`.category SET type = '마을' WHERE idx = 13`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('한강', 31, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('한강', 32, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('한강', 33, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('한강', 38, null)`);
    await queryRunner.query(`INSERT INTO \`exit\`.category (type, ktPlaceIdx, sktPlaceIdx) VALUES ('한강', 40, null)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
