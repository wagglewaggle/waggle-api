import { MigrationInterface, QueryRunner } from "typeorm";

export class modifyCategoryChristmasName1671554175304 implements MigrationInterface {
    name = 'modifyCategoryChristmasName1671554175304'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`type\` \`type\` enum ('테마파크', '쇼핑몰', '공원', '골목 및 거리', '궁궐', '지하철', '마을', '크리스마스 핫플레이스', '크리스마스 핫플', '한강') NOT NULL`);
        await queryRunner.query(`UPDATE \`exit\`.category SET type = '크리스마스 핫플' WHERE idx = 2`);
        await queryRunner.query(`UPDATE \`exit\`.category SET type = '크리스마스 핫플' WHERE idx = 5`);
        await queryRunner.query(`UPDATE \`exit\`.category SET type = '크리스마스 핫플' WHERE idx = 9`);
        await queryRunner.query(`UPDATE \`exit\`.category SET type = '크리스마스 핫플' WHERE idx = 11`);
        await queryRunner.query(`UPDATE \`exit\`.category SET type = '크리스마스 핫플' WHERE idx = 32`);
        await queryRunner.query(`UPDATE \`exit\`.category SET type = '크리스마스 핫플' WHERE idx = 34`);
        await queryRunner.query(`UPDATE \`exit\`.category SET type = '크리스마스 핫플' WHERE idx = 52`);
        await queryRunner.query(`UPDATE \`exit\`.category SET type = '크리스마스 핫플' WHERE idx = 54`);
        await queryRunner.query(`UPDATE \`exit\`.category SET type = '크리스마스 핫플' WHERE idx = 56`);
        await queryRunner.query(`UPDATE \`exit\`.category SET type = '크리스마스 핫플' WHERE idx = 58`);
        await queryRunner.query(`UPDATE \`exit\`.category SET type = '크리스마스 핫플' WHERE idx = 62`);
        await queryRunner.query(`UPDATE \`exit\`.category SET type = '크리스마스 핫플' WHERE idx = 65`);
        await queryRunner.query(`UPDATE \`exit\`.category SET type = '크리스마스 핫플' WHERE idx = 76`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`type\` \`type\` enum ('테마파크', '쇼핑몰', '공원', '골목 및 거리', '궁궐', '지하철', '마을', '크리스마스 핫플', '한강') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`type\` \`type\` enum ('테마파크', '쇼핑몰', '공원', '골목 및 거리', '궁궐', '지하철', '마을', '크리스마스 핫플레이스', '크리스마스 핫플', '한강') NOT NULL`);
        await queryRunner.query(`UPDATE \`exit\`.category SET type = '크리스마스 핫플레이스' WHERE idx = 2`);
        await queryRunner.query(`UPDATE \`exit\`.category SET type = '크리스마스 핫플레이스' WHERE idx = 5`);
        await queryRunner.query(`UPDATE \`exit\`.category SET type = '크리스마스 핫플레이스' WHERE idx = 9`);
        await queryRunner.query(`UPDATE \`exit\`.category SET type = '크리스마스 핫플레이스' WHERE idx = 11`);
        await queryRunner.query(`UPDATE \`exit\`.category SET type = '크리스마스 핫플레이스' WHERE idx = 32`);
        await queryRunner.query(`UPDATE \`exit\`.category SET type = '크리스마스 핫플레이스' WHERE idx = 34`);
        await queryRunner.query(`UPDATE \`exit\`.category SET type = '크리스마스 핫플레이스' WHERE idx = 52`);
        await queryRunner.query(`UPDATE \`exit\`.category SET type = '크리스마스 핫플레이스' WHERE idx = 54`);
        await queryRunner.query(`UPDATE \`exit\`.category SET type = '크리스마스 핫플레이스' WHERE idx = 56`);
        await queryRunner.query(`UPDATE \`exit\`.category SET type = '크리스마스 핫플레이스' WHERE idx = 58`);
        await queryRunner.query(`UPDATE \`exit\`.category SET type = '크리스마스 핫플레이스' WHERE idx = 62`);
        await queryRunner.query(`UPDATE \`exit\`.category SET type = '크리스마스 핫플레이스' WHERE idx = 65`);
        await queryRunner.query(`UPDATE \`exit\`.category SET type = '크리스마스 핫플레이스' WHERE idx = 76`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`type\` \`type\` enum ('테마파크', '쇼핑몰', '공원', '골목 및 거리', '궁궐', '지하철', '마을', '크리스마스 핫플레이스', '한강') NOT NULL`);

    }

}
