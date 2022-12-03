import { MigrationInterface, QueryRunner } from "typeorm";

export class addCctv1670055213800 implements MigrationInterface {
    name = 'addCctv1670055213800'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`cctv\` (\`idx\` int NOT NULL AUTO_INCREMENT, \`src\` varchar(255) NOT NULL, \`cctvname\` varchar(255) NOT NULL, \`placeIdx\` int NULL, PRIMARY KEY (\`idx\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`cctv\` ADD CONSTRAINT \`FK_7e0e317412971c3b2b4208868a2\` FOREIGN KEY (\`placeIdx\`) REFERENCES \`kt_place\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cctv\` DROP FOREIGN KEY \`FK_7e0e317412971c3b2b4208868a2\``);
        await queryRunner.query(`DROP TABLE \`cctv\``);
    }

}
