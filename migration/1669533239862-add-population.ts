import { MigrationInterface, QueryRunner } from "typeorm";

export class addPopulation1669533239862 implements MigrationInterface {
    name = 'addPopulation1669533239862'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`population\` (\`idx\` int NOT NULL AUTO_INCREMENT, \`level\` enum ('RELAXATION', 'NORMAL', 'CROWDED', 'VERY_CROWDED') NOT NULL, \`message\` text NOT NULL, \`male\` int NOT NULL, \`female\` int NOT NULL, \`zeroGen\` int NOT NULL, \`teenager\` int NOT NULL, \`twenties\` int NOT NULL, \`thirties\` int NOT NULL, \`fourties\` int NOT NULL, \`fifties\` int NOT NULL, \`sixties\` int NOT NULL, \`seventies\` int NOT NULL, \`resident\` int NOT NULL, \`nonResident\` int NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`placeIdx\` int NULL, PRIMARY KEY (\`idx\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`province\` (\`idx\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`idx\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`place\` (\`idx\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`x\` int NOT NULL, \`y\` int NOT NULL, \`provinceIdx\` int NULL, PRIMARY KEY (\`idx\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`accident\` (\`idx\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NOT NULL, \`dtype\` varchar(255) NOT NULL, \`info\` text NOT NULL, \`x\` int NOT NULL, \`y\` int NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`placeIdx\` int NULL, PRIMARY KEY (\`idx\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`population\` ADD CONSTRAINT \`FK_a30339cb0f41ff28b22a54dea72\` FOREIGN KEY (\`placeIdx\`) REFERENCES \`place\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`place\` ADD CONSTRAINT \`FK_2832991bcf3a8c16cbf9cfde165\` FOREIGN KEY (\`provinceIdx\`) REFERENCES \`province\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`accident\` ADD CONSTRAINT \`FK_ae1603f072f410ed74a1f2d792c\` FOREIGN KEY (\`placeIdx\`) REFERENCES \`place\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`accident\` DROP FOREIGN KEY \`FK_ae1603f072f410ed74a1f2d792c\``);
        await queryRunner.query(`ALTER TABLE \`place\` DROP FOREIGN KEY \`FK_2832991bcf3a8c16cbf9cfde165\``);
        await queryRunner.query(`ALTER TABLE \`population\` DROP FOREIGN KEY \`FK_a30339cb0f41ff28b22a54dea72\``);
        await queryRunner.query(`DROP TABLE \`accident\``);
        await queryRunner.query(`DROP TABLE \`place\``);
        await queryRunner.query(`DROP TABLE \`province\``);
        await queryRunner.query(`DROP TABLE \`population\``);
    }

}
