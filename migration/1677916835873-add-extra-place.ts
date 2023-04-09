import { MigrationInterface, QueryRunner } from "typeorm";

export class addExtraPlace1677916835873 implements MigrationInterface {
    name = 'addExtraPlace1677916835873'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`extra_place\` (\`idx\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`x\` double NOT NULL, \`y\` double NOT NULL, \`address\` varchar(255) NOT NULL, \`status\` enum ('ACTIVATED', 'Deactivated') NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`locationIdx\` int NULL, \`provinceIdx\` int NULL, PRIMARY KEY (\`idx\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`skt_place\` ADD \`address\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`kt_place\` ADD \`address\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`extra_place\` ADD CONSTRAINT \`FK_27478689bddcdd0f03f33727ebd\` FOREIGN KEY (\`locationIdx\`) REFERENCES \`location\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`extra_place\` ADD CONSTRAINT \`FK_b17dc2c08e62c79ae3a9cef0ae7\` FOREIGN KEY (\`provinceIdx\`) REFERENCES \`province\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`extra_place\` DROP FOREIGN KEY \`FK_b17dc2c08e62c79ae3a9cef0ae7\``);
        await queryRunner.query(`ALTER TABLE \`extra_place\` DROP FOREIGN KEY \`FK_27478689bddcdd0f03f33727ebd\``);
        await queryRunner.query(`ALTER TABLE \`kt_place\` DROP COLUMN \`address\``);
        await queryRunner.query(`ALTER TABLE \`skt_place\` DROP COLUMN \`address\``);
        await queryRunner.query(`DROP TABLE \`extra_place\``);
    }

}
