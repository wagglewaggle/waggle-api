import { MigrationInterface, QueryRunner } from "typeorm";

export class addPinPlace1676794954504 implements MigrationInterface {
    name = 'addPinPlace1676794954504'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`pin_place\` (\`idx\` int NOT NULL AUTO_INCREMENT, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userIdx\` int NULL, \`sktPlaceIdx\` int NULL, \`ktPlaceIdx\` int NULL, PRIMARY KEY (\`idx\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`pin_place\` ADD CONSTRAINT \`FK_d2354df0c18f91ce7f4aeb74137\` FOREIGN KEY (\`userIdx\`) REFERENCES \`user\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pin_place\` ADD CONSTRAINT \`FK_961309e0d7268345d8770187945\` FOREIGN KEY (\`sktPlaceIdx\`) REFERENCES \`skt_place\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pin_place\` ADD CONSTRAINT \`FK_421dbae48b71129d11fef22f04c\` FOREIGN KEY (\`ktPlaceIdx\`) REFERENCES \`kt_place\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pin_place\` DROP FOREIGN KEY \`FK_421dbae48b71129d11fef22f04c\``);
        await queryRunner.query(`ALTER TABLE \`pin_place\` DROP FOREIGN KEY \`FK_961309e0d7268345d8770187945\``);
        await queryRunner.query(`ALTER TABLE \`pin_place\` DROP FOREIGN KEY \`FK_d2354df0c18f91ce7f4aeb74137\``);
        await queryRunner.query(`DROP TABLE \`pin_place\``);
    }

}
