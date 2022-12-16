import { MigrationInterface, QueryRunner } from "typeorm";

export class addCategoryAndLocation1671204273753 implements MigrationInterface {
    name = 'addCategoryAndLocation1671204273753'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`kt_population\` CHANGE \`fourties\` \`forties\` int NOT NULL`);
        await queryRunner.query(`CREATE TABLE \`location\` (\`idx\` int NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`idx\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category\` (\`idx\` int NOT NULL AUTO_INCREMENT, \`type\` enum ('테마파크', '쇼핑몰', '공원', '골목 및 거리', '궁궐', '지하철', '마을', '크리스마스 핫플레이스') NOT NULL, \`isKtPlace\` tinyint NOT NULL, \`ktPlaceIdx\` int NULL, \`sktPlaceIdx\` int NULL, PRIMARY KEY (\`idx\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`skt_place\` ADD \`locationIdx\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`kt_place\` ADD \`locationIdx\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`skt_place\` ADD CONSTRAINT \`FK_98cc76107ba4217bb18f2f65ba1\` FOREIGN KEY (\`locationIdx\`) REFERENCES \`location\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`kt_place\` ADD CONSTRAINT \`FK_850b9f2f49b989323517a399c5e\` FOREIGN KEY (\`locationIdx\`) REFERENCES \`location\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`category\` ADD CONSTRAINT \`FK_cf1bac7e2173b07031ed8eef4de\` FOREIGN KEY (\`ktPlaceIdx\`) REFERENCES \`kt_place\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`category\` ADD CONSTRAINT \`FK_0d8ccf87a1a02f9b9085a1b75ec\` FOREIGN KEY (\`sktPlaceIdx\`) REFERENCES \`skt_place\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` DROP FOREIGN KEY \`FK_0d8ccf87a1a02f9b9085a1b75ec\``);
        await queryRunner.query(`ALTER TABLE \`category\` DROP FOREIGN KEY \`FK_cf1bac7e2173b07031ed8eef4de\``);
        await queryRunner.query(`ALTER TABLE \`kt_place\` DROP FOREIGN KEY \`FK_850b9f2f49b989323517a399c5e\``);
        await queryRunner.query(`ALTER TABLE \`skt_place\` DROP FOREIGN KEY \`FK_98cc76107ba4217bb18f2f65ba1\``);
        await queryRunner.query(`ALTER TABLE \`kt_place\` DROP COLUMN \`locationIdx\``);
        await queryRunner.query(`ALTER TABLE \`skt_place\` DROP COLUMN \`locationIdx\``);
        await queryRunner.query(`DROP TABLE \`category\``);
        await queryRunner.query(`DROP TABLE \`location\``);
        await queryRunner.query(`ALTER TABLE \`kt_population\` CHANGE \`forties\` \`fourties\` int NOT NULL`);
    }

}
