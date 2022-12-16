import { MigrationInterface, QueryRunner } from "typeorm";

export class deleteCategoryIsKtPlace1671204385793 implements MigrationInterface {
    name = 'deleteCategoryIsKtPlace1671204385793'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`isKtPlace\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`isKtPlace\` tinyint NOT NULL`);
    }

}
