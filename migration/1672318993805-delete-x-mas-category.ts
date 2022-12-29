import { MigrationInterface, QueryRunner } from 'typeorm';

export class deleteXMasCategory1672318993805 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM \`exit\`.category WHERE type = '크리스마스 핫플'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
