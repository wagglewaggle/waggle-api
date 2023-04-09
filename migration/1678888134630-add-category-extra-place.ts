import { MigrationInterface, QueryRunner } from "typeorm";

export class addCategoryExtraPlace1678888134630 implements MigrationInterface {
    name = 'addCategoryExtraPlace1678888134630'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`extraPlaceIdx\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`extra_place\` CHANGE \`status\` \`status\` enum ('ACTIVATED', 'DEACTIVATED') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` ADD CONSTRAINT \`FK_ccbec4b081d9b085cbfd6436d0c\` FOREIGN KEY (\`extraPlaceIdx\`) REFERENCES \`extra_place\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` DROP FOREIGN KEY \`FK_ccbec4b081d9b085cbfd6436d0c\``);
        await queryRunner.query(`ALTER TABLE \`extra_place\` CHANGE \`status\` \`status\` enum ('ACTIVATED', 'Deactivated') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`extraPlaceIdx\``);
    }

}
