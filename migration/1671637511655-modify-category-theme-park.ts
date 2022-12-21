import { MigrationInterface, QueryRunner } from 'typeorm';

export class modifyCategoryThemePark1671637511655 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`UPDATE \`exit\`.category SET type = '공원' WHERE idx = 44`);
    await queryRunner.query(`UPDATE \`exit\`.category SET type = '공원' WHERE idx = 45`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
