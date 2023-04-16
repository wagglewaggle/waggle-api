import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAppleUser1681644664606 implements MigrationInterface {
  name = 'AddAppleUser1681644664606';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`snsType\` \`snsType\` enum ('NAVER', 'KAKAO', 'GOOGLE', 'APPLE') NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`snsType\` \`snsType\` enum ('NAVER', 'KAKAO', 'GOOGLE') NOT NULL`);
  }
}
