import { MigrationInterface, QueryRunner } from 'typeorm';

export class addMissingCategoryType1680704199048 implements MigrationInterface {
  name = 'addMissingCategoryType1680704199048';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`category\` CHANGE \`type\` \`type\` enum ('테마파크', '쇼핑몰', '공원', '골목 및 거리', '궁궐', '지하철', '마을', '크리스마스 핫플', '한강', '강변', '해변', '봄 나들이', '기타 지역') NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`category\` CHANGE \`type\` \`type\` enum ('테마파크', '쇼핑몰', '공원', '골목 및 거리', '궁궐', '지하철', '마을', '크리스마스 핫플', '한강') NOT NULL`,
    );
  }
}
