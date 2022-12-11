import { MigrationInterface, QueryRunner } from "typeorm";

export class posTypeDouble1670754299944 implements MigrationInterface {
    name = 'posTypeDouble1670754299944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`kt_accident\` DROP COLUMN \`x\``);
        await queryRunner.query(`ALTER TABLE \`kt_accident\` ADD \`x\` double NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`kt_accident\` DROP COLUMN \`y\``);
        await queryRunner.query(`ALTER TABLE \`kt_accident\` ADD \`y\` double NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`skt_place\` DROP COLUMN \`x\``);
        await queryRunner.query(`ALTER TABLE \`skt_place\` ADD \`x\` double NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`skt_place\` DROP COLUMN \`y\``);
        await queryRunner.query(`ALTER TABLE \`skt_place\` ADD \`y\` double NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`kt_place\` DROP COLUMN \`x\``);
        await queryRunner.query(`ALTER TABLE \`kt_place\` ADD \`x\` double NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`kt_place\` DROP COLUMN \`y\``);
        await queryRunner.query(`ALTER TABLE \`kt_place\` ADD \`y\` double NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`kt_place\` DROP COLUMN \`y\``);
        await queryRunner.query(`ALTER TABLE \`kt_place\` ADD \`y\` decimal(17,14) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`kt_place\` DROP COLUMN \`x\``);
        await queryRunner.query(`ALTER TABLE \`kt_place\` ADD \`x\` decimal(17,15) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`skt_place\` DROP COLUMN \`y\``);
        await queryRunner.query(`ALTER TABLE \`skt_place\` ADD \`y\` decimal(17,14) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`skt_place\` DROP COLUMN \`x\``);
        await queryRunner.query(`ALTER TABLE \`skt_place\` ADD \`x\` decimal(17,15) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`kt_accident\` DROP COLUMN \`y\``);
        await queryRunner.query(`ALTER TABLE \`kt_accident\` ADD \`y\` decimal(17,14) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`kt_accident\` DROP COLUMN \`x\``);
        await queryRunner.query(`ALTER TABLE \`kt_accident\` ADD \`x\` decimal(17,15) NOT NULL`);
    }

}
