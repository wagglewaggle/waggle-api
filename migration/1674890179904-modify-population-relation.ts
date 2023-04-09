import { MigrationInterface, QueryRunner } from "typeorm";

export class modifyPopulationRelation1674890179904 implements MigrationInterface {
    name = 'modifyPopulationRelation1674890179904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`skt_population\` DROP FOREIGN KEY \`FK_e34967ef88f650b158efee2bb70\``);
        await queryRunner.query(`ALTER TABLE \`skt_population\` ADD UNIQUE INDEX \`IDX_e34967ef88f650b158efee2bb7\` (\`placeIdx\`)`);
        await queryRunner.query(`ALTER TABLE \`kt_population\` DROP FOREIGN KEY \`FK_c7f0679933896964175621cf29c\``);
        await queryRunner.query(`ALTER TABLE \`kt_population\` ADD UNIQUE INDEX \`IDX_c7f0679933896964175621cf29\` (\`placeIdx\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_e34967ef88f650b158efee2bb7\` ON \`skt_population\` (\`placeIdx\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_c7f0679933896964175621cf29\` ON \`kt_population\` (\`placeIdx\`)`);
        await queryRunner.query(`ALTER TABLE \`skt_population\` ADD CONSTRAINT \`FK_e34967ef88f650b158efee2bb70\` FOREIGN KEY (\`placeIdx\`) REFERENCES \`skt_place\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`kt_population\` ADD CONSTRAINT \`FK_c7f0679933896964175621cf29c\` FOREIGN KEY (\`placeIdx\`) REFERENCES \`kt_place\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`kt_population\` DROP FOREIGN KEY \`FK_c7f0679933896964175621cf29c\``);
        await queryRunner.query(`ALTER TABLE \`skt_population\` DROP FOREIGN KEY \`FK_e34967ef88f650b158efee2bb70\``);
        await queryRunner.query(`DROP INDEX \`REL_c7f0679933896964175621cf29\` ON \`kt_population\``);
        await queryRunner.query(`DROP INDEX \`REL_e34967ef88f650b158efee2bb7\` ON \`skt_population\``);
        await queryRunner.query(`ALTER TABLE \`kt_population\` DROP INDEX \`IDX_c7f0679933896964175621cf29\``);
        await queryRunner.query(`ALTER TABLE \`kt_population\` ADD CONSTRAINT \`FK_c7f0679933896964175621cf29c\` FOREIGN KEY (\`placeIdx\`) REFERENCES \`kt_place\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`skt_population\` DROP INDEX \`IDX_e34967ef88f650b158efee2bb7\``);
        await queryRunner.query(`ALTER TABLE \`skt_population\` ADD CONSTRAINT \`FK_e34967ef88f650b158efee2bb70\` FOREIGN KEY (\`placeIdx\`) REFERENCES \`skt_place\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
