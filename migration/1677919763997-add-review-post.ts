import { MigrationInterface, QueryRunner } from "typeorm";

export class addReviewPost1677919763997 implements MigrationInterface {
    name = 'addReviewPost1677919763997'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`reply\` (\`idx\` int NOT NULL AUTO_INCREMENT, \`content\` text NOT NULL, \`status\` enum ('ACTIVATED', 'DELETED', 'REPORT_DELETED') NOT NULL, \`report\` int NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`reviewPostIdx\` int NULL, \`userIdx\` int NULL, PRIMARY KEY (\`idx\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`pin_review_post\` (\`idx\` int NOT NULL AUTO_INCREMENT, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userIdx\` int NULL, \`reviewPostIdx\` int NULL, PRIMARY KEY (\`idx\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`review_post_image\` (\`idx\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(255) NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`reviewPostIdx\` int NULL, PRIMARY KEY (\`idx\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`review_post\` (\`idx\` int NOT NULL AUTO_INCREMENT, \`content\` text NOT NULL, \`view\` int NOT NULL, \`report\` int NOT NULL, \`status\` enum ('ACTIVATED', 'DELETED', 'REPORT_DELETED', 'WRITER_ACTIVATED') NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userIdx\` int NULL, \`sktPlaceIdx\` int NULL, \`ktPlaceIdx\` int NULL, \`extraPlaceIdx\` int NULL, PRIMARY KEY (\`idx\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`pin_place\` ADD \`extraPlaceIdx\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`reply\` ADD CONSTRAINT \`FK_3846d79f1592257b50da9e513a5\` FOREIGN KEY (\`reviewPostIdx\`) REFERENCES \`review_post\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reply\` ADD CONSTRAINT \`FK_8c5b3d4978a7eb2af065ddae9da\` FOREIGN KEY (\`userIdx\`) REFERENCES \`user\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pin_review_post\` ADD CONSTRAINT \`FK_5bd6d67ac488e4917115c3635a7\` FOREIGN KEY (\`userIdx\`) REFERENCES \`user\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pin_review_post\` ADD CONSTRAINT \`FK_300080087ef6d0811c52d2d5c05\` FOREIGN KEY (\`reviewPostIdx\`) REFERENCES \`review_post\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`review_post_image\` ADD CONSTRAINT \`FK_67b2b9381bc4340d38833d7a62b\` FOREIGN KEY (\`reviewPostIdx\`) REFERENCES \`review_post\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`review_post\` ADD CONSTRAINT \`FK_01e9bef2f4b3000661b970f5c02\` FOREIGN KEY (\`userIdx\`) REFERENCES \`user\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`review_post\` ADD CONSTRAINT \`FK_7eee0d3e73bb8e901f7847e1c43\` FOREIGN KEY (\`sktPlaceIdx\`) REFERENCES \`skt_place\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`review_post\` ADD CONSTRAINT \`FK_85d326b06511b1508cb11226985\` FOREIGN KEY (\`ktPlaceIdx\`) REFERENCES \`kt_place\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`review_post\` ADD CONSTRAINT \`FK_b628075438c964c11e9aa2ff006\` FOREIGN KEY (\`extraPlaceIdx\`) REFERENCES \`extra_place\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pin_place\` ADD CONSTRAINT \`FK_00fde53088be7e0eb1f7d3c5a97\` FOREIGN KEY (\`extraPlaceIdx\`) REFERENCES \`extra_place\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pin_place\` DROP FOREIGN KEY \`FK_00fde53088be7e0eb1f7d3c5a97\``);
        await queryRunner.query(`ALTER TABLE \`review_post\` DROP FOREIGN KEY \`FK_b628075438c964c11e9aa2ff006\``);
        await queryRunner.query(`ALTER TABLE \`review_post\` DROP FOREIGN KEY \`FK_85d326b06511b1508cb11226985\``);
        await queryRunner.query(`ALTER TABLE \`review_post\` DROP FOREIGN KEY \`FK_7eee0d3e73bb8e901f7847e1c43\``);
        await queryRunner.query(`ALTER TABLE \`review_post\` DROP FOREIGN KEY \`FK_01e9bef2f4b3000661b970f5c02\``);
        await queryRunner.query(`ALTER TABLE \`review_post_image\` DROP FOREIGN KEY \`FK_67b2b9381bc4340d38833d7a62b\``);
        await queryRunner.query(`ALTER TABLE \`pin_review_post\` DROP FOREIGN KEY \`FK_300080087ef6d0811c52d2d5c05\``);
        await queryRunner.query(`ALTER TABLE \`pin_review_post\` DROP FOREIGN KEY \`FK_5bd6d67ac488e4917115c3635a7\``);
        await queryRunner.query(`ALTER TABLE \`reply\` DROP FOREIGN KEY \`FK_8c5b3d4978a7eb2af065ddae9da\``);
        await queryRunner.query(`ALTER TABLE \`reply\` DROP FOREIGN KEY \`FK_3846d79f1592257b50da9e513a5\``);
        await queryRunner.query(`ALTER TABLE \`pin_place\` DROP COLUMN \`extraPlaceIdx\``);
        await queryRunner.query(`DROP TABLE \`review_post\``);
        await queryRunner.query(`DROP TABLE \`review_post_image\``);
        await queryRunner.query(`DROP TABLE \`pin_review_post\``);
        await queryRunner.query(`DROP TABLE \`reply\``);
    }

}
