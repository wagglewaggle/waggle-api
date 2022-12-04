import { MigrationInterface, QueryRunner } from "typeorm";

export class modifyPosType1670141901581 implements MigrationInterface {
    name = 'modifyPosType1670141901581'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`kt_place\` DROP COLUMN \`x\``);
        await queryRunner.query(`ALTER TABLE \`kt_place\` ADD \`x\` decimal(17,15) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`kt_place\` DROP COLUMN \`y\``);
        await queryRunner.query(`ALTER TABLE \`kt_place\` ADD \`y\` decimal(17,15) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`kt_place\` DROP COLUMN \`y\``);
        await queryRunner.query(`ALTER TABLE \`kt_place\` ADD \`y\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`kt_place\` DROP COLUMN \`x\``);
        await queryRunner.query(`ALTER TABLE \`kt_place\` ADD \`x\` int NOT NULL`);
    }

}
