import { MigrationInterface, QueryRunner } from "typeorm";

export class addRoadTrafficDate1673108113076 implements MigrationInterface {
    name = 'addRoadTrafficDate1673108113076'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`kt_road_traffic\` ADD \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`kt_road_traffic\` ADD \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`kt_road_traffic\` DROP COLUMN \`updatedDate\``);
        await queryRunner.query(`ALTER TABLE \`kt_road_traffic\` DROP COLUMN \`createdDate\``);
    }

}
