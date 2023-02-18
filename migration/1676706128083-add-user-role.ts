import { MigrationInterface, QueryRunner } from "typeorm";

export class addUserRole1676706128083 implements MigrationInterface {
    name = 'addUserRole1676706128083'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_role\` (\`idx\` int NOT NULL AUTO_INCREMENT, \`role\` enum ('ADMIN', 'NORMAL') NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userIdx\` int NULL, UNIQUE INDEX \`REL_5b75f05948a2b5a831a7cec213\` (\`userIdx\`), PRIMARY KEY (\`idx\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD CONSTRAINT \`FK_5b75f05948a2b5a831a7cec2130\` FOREIGN KEY (\`userIdx\`) REFERENCES \`user\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP FOREIGN KEY \`FK_5b75f05948a2b5a831a7cec2130\``);
        await queryRunner.query(`DROP INDEX \`REL_5b75f05948a2b5a831a7cec213\` ON \`user_role\``);
        await queryRunner.query(`DROP TABLE \`user_role\``);
    }

}
