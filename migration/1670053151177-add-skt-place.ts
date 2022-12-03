import { MigrationInterface, QueryRunner } from "typeorm";

export class addSktPlace1670053151177 implements MigrationInterface {
    name = 'addSktPlace1670053151177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`kt_population\` (\`idx\` int NOT NULL AUTO_INCREMENT, \`level\` enum ('RELAXATION', 'NORMAL', 'CROWDED', 'VERY_CROWDED') NOT NULL, \`message\` text NOT NULL, \`male\` int NOT NULL, \`female\` int NOT NULL, \`zeroGen\` int NOT NULL, \`teenager\` int NOT NULL, \`twenties\` int NOT NULL, \`thirties\` int NOT NULL, \`fourties\` int NOT NULL, \`fifties\` int NOT NULL, \`sixties\` int NOT NULL, \`seventies\` int NOT NULL, \`resident\` int NOT NULL, \`nonResident\` int NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`placeIdx\` int NULL, PRIMARY KEY (\`idx\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`skt_population\` (\`idx\` int NOT NULL AUTO_INCREMENT, \`level\` enum ('VERY_RELAXATION', 'RELAXATION', 'NORMAL', 'CROWDED', 'VERY_CROWDED') NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`placeIdx\` int NULL, PRIMARY KEY (\`idx\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`skt_place\` (\`idx\` int NOT NULL AUTO_INCREMENT, \`poiId\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`provinceIdx\` int NULL, PRIMARY KEY (\`idx\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`kt_place\` (\`idx\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`x\` int NOT NULL, \`y\` int NOT NULL, \`provinceIdx\` int NULL, PRIMARY KEY (\`idx\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`kt_accident\` (\`idx\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NOT NULL, \`dtype\` varchar(255) NOT NULL, \`info\` text NOT NULL, \`x\` int NOT NULL, \`y\` int NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`placeIdx\` int NULL, PRIMARY KEY (\`idx\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`kt_population\` ADD CONSTRAINT \`FK_c7f0679933896964175621cf29c\` FOREIGN KEY (\`placeIdx\`) REFERENCES \`kt_place\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`skt_population\` ADD CONSTRAINT \`FK_e34967ef88f650b158efee2bb70\` FOREIGN KEY (\`placeIdx\`) REFERENCES \`skt_place\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`skt_place\` ADD CONSTRAINT \`FK_7be5bfd3396b19f580cbe292494\` FOREIGN KEY (\`provinceIdx\`) REFERENCES \`province\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`kt_place\` ADD CONSTRAINT \`FK_430b0defde020cfc8e42d45b61b\` FOREIGN KEY (\`provinceIdx\`) REFERENCES \`province\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`kt_accident\` ADD CONSTRAINT \`FK_8f9605c19b4066d044a9f7f9368\` FOREIGN KEY (\`placeIdx\`) REFERENCES \`kt_place\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE \`accident\``);
        await queryRunner.query(`DROP TABLE \`population\``);
        await queryRunner.query(`DROP TABLE \`place\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`kt_accident\` DROP FOREIGN KEY \`FK_8f9605c19b4066d044a9f7f9368\``);
        await queryRunner.query(`ALTER TABLE \`kt_place\` DROP FOREIGN KEY \`FK_430b0defde020cfc8e42d45b61b\``);
        await queryRunner.query(`ALTER TABLE \`skt_place\` DROP FOREIGN KEY \`FK_7be5bfd3396b19f580cbe292494\``);
        await queryRunner.query(`ALTER TABLE \`skt_population\` DROP FOREIGN KEY \`FK_e34967ef88f650b158efee2bb70\``);
        await queryRunner.query(`ALTER TABLE \`kt_population\` DROP FOREIGN KEY \`FK_c7f0679933896964175621cf29c\``);
        await queryRunner.query(`DROP TABLE \`kt_accident\``);
        await queryRunner.query(`DROP TABLE \`kt_place\``);
        await queryRunner.query(`DROP TABLE \`skt_place\``);
        await queryRunner.query(`DROP TABLE \`skt_population\``);
        await queryRunner.query(`DROP TABLE \`kt_population\``);
        await queryRunner.query(`CREATE TABLE \`population\` (\`idx\` int NOT NULL AUTO_INCREMENT, \`level\` enum ('RELAXATION', 'NORMAL', 'CROWDED', 'VERY_CROWDED') NOT NULL, \`message\` text NOT NULL, \`male\` int NOT NULL, \`female\` int NOT NULL, \`zeroGen\` int NOT NULL, \`teenager\` int NOT NULL, \`twenties\` int NOT NULL, \`thirties\` int NOT NULL, \`fourties\` int NOT NULL, \`fifties\` int NOT NULL, \`sixties\` int NOT NULL, \`seventies\` int NOT NULL, \`resident\` int NOT NULL, \`nonResident\` int NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`placeIdx\` int NULL, PRIMARY KEY (\`idx\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`place\` (\`idx\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`x\` int NOT NULL, \`y\` int NOT NULL, \`provinceIdx\` int NULL, PRIMARY KEY (\`idx\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`accident\` (\`idx\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NOT NULL, \`dtype\` varchar(255) NOT NULL, \`info\` text NOT NULL, \`x\` int NOT NULL, \`y\` int NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`placeIdx\` int NULL, PRIMARY KEY (\`idx\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`population\` ADD CONSTRAINT \`FK_a30339cb0f41ff28b22a54dea72\` FOREIGN KEY (\`placeIdx\`) REFERENCES \`place\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`place\` ADD CONSTRAINT \`FK_2832991bcf3a8c16cbf9cfde165\` FOREIGN KEY (\`provinceIdx\`) REFERENCES \`province\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`accident\` ADD CONSTRAINT \`FK_ae1603f072f410ed74a1f2d792c\` FOREIGN KEY (\`placeIdx\`) REFERENCES \`place\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
