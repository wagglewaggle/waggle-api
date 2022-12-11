import { MigrationInterface, QueryRunner } from "typeorm"

export class insertKtPlace1670754437602 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y) VALUES (5799875, '롯데월드몰', 1, 37.51385147, 127.10448326)`);
        await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y) VALUES (187961, '롯데월드잠실점', 1, 37.51107390, 127.09815059)`);
        await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y) VALUES (1172091, '타임스퀘어', 1, 37.51723636, 126.90347369)`);
        await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y) VALUES (10067845, '더현대서울', 1, 37.52601356, 126.92827674)`);
        await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y) VALUES (2905972, 'IFC몰', 1, 37.52545802, 126.92544368)`);
        await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y) VALUES (182018, '어린이대공원', 1, 37.54976354, 127.08067886)`);
        await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y) VALUES (334736, '신세계백화점본점신관', 1, 37.56031607, 126.98077099)`);
        await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y) VALUES (219475, '롯데백화점본점', 1, 37.56473224, 126.98174300)`);
        await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y) VALUES (187760, '현대백화점무역센터점', 1, 37.50871237, 127.05970971)`);
        await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y) VALUES (6144946, '현대백화점디큐브시티점', 1, 37.50868154, 126.88922523)`);
        await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y) VALUES (366844, '현대백화점신촌점', 1, 37.55603798, 126.93580299)`);
        await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y) VALUES (292664, '현대백화점압구정본점', 1, 37.52737629, 127.02748989)`);
        await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y) VALUES (8354756, '갤러리아백화점광교점', 1, 37.28532156, 127.05727178)`);
        await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y) VALUES (359817, '갤러리아백화점명품관WEST', 1, 37.52845972, 127.04007205)`);
        await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y) VALUES (214920, '신세계백화점강남점', 1, 37.50501736, 127.00421486)`);
        await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y) VALUES (5411247, '스타필드하남', 1, 37.54557217, 127.22399927)`);
        await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y) VALUES (7633414, '스타필드고양', 1, 37.64705444, 126.89444307)`);
        await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y) VALUES (8875892, '스타필드안성', 1, 36.99432903, 127.14729952)`);
        await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y) VALUES (387701, '에버랜드', 1, 37.29260112, 127.20342498)`);
        await queryRunner.query(`INSERT INTO \`exit\`.\`skt_place\` (poiId, name, provinceIdx, x, y) VALUES (5400712, '현대백화점판교점', 1, 37.39261567, 127.11198602)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
