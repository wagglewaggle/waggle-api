import { MigrationInterface, QueryRunner } from "typeorm";

export class addLevelReply1678444827725 implements MigrationInterface {
    name = 'addLevelReply1678444827725'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reply\` ADD \`level\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`reply\` ADD \`mainReplyIdx\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reply\` DROP COLUMN \`mainReplyIdx\``);
        await queryRunner.query(`ALTER TABLE \`reply\` DROP COLUMN \`level\``);
    }

}
