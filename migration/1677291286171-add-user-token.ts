import { MigrationInterface, QueryRunner } from "typeorm";

export class addUserToken1677291286171 implements MigrationInterface {
    name = 'addUserToken1677291286171'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_token\` (\`idx\` int NOT NULL AUTO_INCREMENT, \`token\` varchar(255) NOT NULL, \`status\` enum ('ACTIVATED', 'EXPIRED', 'INTENTIONAL_EXPIRED') NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`expiredDate\` datetime NULL, \`userIdx\` int NULL, PRIMARY KEY (\`idx\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_token\` ADD CONSTRAINT \`FK_9b1b321a4986d83c508fee22852\` FOREIGN KEY (\`userIdx\`) REFERENCES \`user\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_token\` DROP FOREIGN KEY \`FK_9b1b321a4986d83c508fee22852\``);
        await queryRunner.query(`DROP TABLE \`user_token\``);
    }

}
