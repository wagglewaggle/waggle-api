import { MigrationInterface, QueryRunner } from "typeorm";

export class addIndexNickname1679214088664 implements MigrationInterface {
    name = 'addIndexNickname1679214088664'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX \`IDX_e2364281027b926b879fa2fa1e\` ON \`user\` (\`nickname\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_e2364281027b926b879fa2fa1e\` ON \`user\``);
    }

}
