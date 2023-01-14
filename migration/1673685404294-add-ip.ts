import { MigrationInterface, QueryRunner } from "typeorm";

export class addIp1673685404294 implements MigrationInterface {
    name = 'addIp1673685404294'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`ip\` (\`idx\` int NOT NULL, \`address\` varchar(255) NOT NULL, \`status\` enum ('ACTIVATED', 'DEACTIVATED') NOT NULL, PRIMARY KEY (\`idx\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`ip\``);
    }

}
