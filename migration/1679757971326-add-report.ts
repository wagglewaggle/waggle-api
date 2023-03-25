import { MigrationInterface, QueryRunner } from "typeorm";

export class addReport1679757971326 implements MigrationInterface {
    name = 'addReport1679757971326'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`reply_report\` (\`idx\` int NOT NULL AUTO_INCREMENT, \`replyIdx\` int NULL, \`userIdx\` int NULL, PRIMARY KEY (\`idx\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`review_post_report\` (\`idx\` int NOT NULL AUTO_INCREMENT, \`reviewPostIdx\` int NULL, \`userIdx\` int NULL, PRIMARY KEY (\`idx\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`reply\` DROP COLUMN \`report\``);
        await queryRunner.query(`ALTER TABLE \`review_post\` DROP COLUMN \`report\``);
        await queryRunner.query(`ALTER TABLE \`reply_report\` ADD CONSTRAINT \`FK_61a49657f0a33077d82cfd2440e\` FOREIGN KEY (\`replyIdx\`) REFERENCES \`reply\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reply_report\` ADD CONSTRAINT \`FK_5f70b2aa0f0f81f6f3fd8ed17ea\` FOREIGN KEY (\`userIdx\`) REFERENCES \`user\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`review_post_report\` ADD CONSTRAINT \`FK_394d494968a30ee79ed617f7a84\` FOREIGN KEY (\`reviewPostIdx\`) REFERENCES \`review_post\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`review_post_report\` ADD CONSTRAINT \`FK_6e7da6ada46c0c24efb1ceae87a\` FOREIGN KEY (\`userIdx\`) REFERENCES \`user\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`review_post_report\` DROP FOREIGN KEY \`FK_6e7da6ada46c0c24efb1ceae87a\``);
        await queryRunner.query(`ALTER TABLE \`review_post_report\` DROP FOREIGN KEY \`FK_394d494968a30ee79ed617f7a84\``);
        await queryRunner.query(`ALTER TABLE \`reply_report\` DROP FOREIGN KEY \`FK_5f70b2aa0f0f81f6f3fd8ed17ea\``);
        await queryRunner.query(`ALTER TABLE \`reply_report\` DROP FOREIGN KEY \`FK_61a49657f0a33077d82cfd2440e\``);
        await queryRunner.query(`ALTER TABLE \`review_post\` ADD \`report\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`reply\` ADD \`report\` int NOT NULL`);
        await queryRunner.query(`DROP TABLE \`review_post_report\``);
        await queryRunner.query(`DROP TABLE \`reply_report\``);
    }

}
