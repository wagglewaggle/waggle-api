import { MigrationInterface, QueryRunner } from 'typeorm';

export class deleteUserColumn1681133922829 implements MigrationInterface {
  name = 'deleteUserColumn1681133922829';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`name\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` ADD \`name\` varchar(255) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` ADD \`email\` varchar(255) NOT NULL`);
  }
}
