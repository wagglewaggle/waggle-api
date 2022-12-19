import { MigrationInterface, QueryRunner } from "typeorm";

export class addRoadTraffic1671461889540 implements MigrationInterface {
    name = 'addRoadTraffic1671461889540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`kt_road_traffic\` (\`idx\` int NOT NULL AUTO_INCREMENT, \`info\` text NOT NULL, \`type\` varchar(255) NOT NULL, \`avgSpeed\` int NOT NULL, \`ktPlaceIdx\` int NULL, UNIQUE INDEX \`REL_7e68edacce9b8a0ae8efb214d4\` (\`ktPlaceIdx\`), PRIMARY KEY (\`idx\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`type\` \`type\` enum ('테마파크', '쇼핑몰', '공원', '골목 및 거리', '궁궐', '지하철', '마을', '크리스마스 핫플레이스', '한강') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`kt_road_traffic\` ADD CONSTRAINT \`FK_7e68edacce9b8a0ae8efb214d40\` FOREIGN KEY (\`ktPlaceIdx\`) REFERENCES \`kt_place\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`kt_road_traffic\` DROP FOREIGN KEY \`FK_7e68edacce9b8a0ae8efb214d40\``);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`type\` \`type\` enum ('테마파크', '쇼핑몰', '공원', '골목 및 거리', '궁궐', '지하철', '마을', '크리스마스 핫플레이스') NOT NULL`);
        await queryRunner.query(`DROP INDEX \`REL_7e68edacce9b8a0ae8efb214d4\` ON \`kt_road_traffic\``);
        await queryRunner.query(`DROP TABLE \`kt_road_traffic\``);
    }

}
