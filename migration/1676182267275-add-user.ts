import { MigrationInterface, QueryRunner } from "typeorm";

export class addUser1676182267275 implements MigrationInterface {
    name = 'addUser1676182267275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`idx\` int NOT NULL AUTO_INCREMENT, \`snsId\` varchar(255) NOT NULL, \`snsType\` enum ('NAVER', 'KAKAO', 'GOOGLE') NOT NULL, \`email\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`nickname\` varchar(255) NOT NULL, \`status\` enum ('ACTIVATED', 'DEACTIVATED', 'LOCKED') NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_8434a0f43c344c75f5accc907b\` (\`snsId\`), PRIMARY KEY (\`idx\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_8434a0f43c344c75f5accc907b\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
