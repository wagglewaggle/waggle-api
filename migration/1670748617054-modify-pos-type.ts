import { MigrationInterface, QueryRunner } from "typeorm";

export class modifyPosType1670748617054 implements MigrationInterface {
    name = 'modifyPosType1670748617054'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`skt_place\` ADD \`x\` decimal(17,15) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`skt_place\` ADD \`y\` decimal(17,14) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`kt_accident\` DROP COLUMN \`x\``);
        await queryRunner.query(`ALTER TABLE \`kt_accident\` ADD \`x\` decimal(17,15) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`kt_accident\` DROP COLUMN \`y\``);
        await queryRunner.query(`ALTER TABLE \`kt_accident\` ADD \`y\` decimal(17,14) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`skt_place\` DROP COLUMN \`poiId\``);
        await queryRunner.query(`ALTER TABLE \`skt_place\` ADD \`poiId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`kt_place\` DROP COLUMN \`x\``);
        await queryRunner.query(`ALTER TABLE \`kt_place\` ADD \`x\` decimal(17,15) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`kt_place\` DROP COLUMN \`y\``);
        await queryRunner.query(`ALTER TABLE \`kt_place\` ADD \`y\` decimal(17,14) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`kt_place\` DROP COLUMN \`y\``);
        await queryRunner.query(`ALTER TABLE \`kt_place\` ADD \`y\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`kt_place\` DROP COLUMN \`x\``);
        await queryRunner.query(`ALTER TABLE \`kt_place\` ADD \`x\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`skt_place\` DROP COLUMN \`poiId\``);
        await queryRunner.query(`ALTER TABLE \`skt_place\` ADD \`poiId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`kt_accident\` DROP COLUMN \`y\``);
        await queryRunner.query(`ALTER TABLE \`kt_accident\` ADD \`y\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`kt_accident\` DROP COLUMN \`x\``);
        await queryRunner.query(`ALTER TABLE \`kt_accident\` ADD \`x\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`skt_place\` DROP COLUMN \`y\``);
        await queryRunner.query(`ALTER TABLE \`skt_place\` DROP COLUMN \`x\``);
    }

}
