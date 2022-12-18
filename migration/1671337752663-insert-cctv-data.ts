import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertCctvData1671337752663 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.52:1935/live/135.stream/playlist.m3u8&cctvname=L010112', '동대문운동장', 2)`);

    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.52:1935/live/121.stream/playlist.m3u8&cctvname=L010098', '종로1가', 3)`);
    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.53:1935/live/551.stream/playlist.m3u8&cctvname=L010291', '무교동사거리', 3)`);
    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.52:1935/live/125.stream/playlist.m3u8&cctvname=L010102', '청계2가', 3)`);
    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.51:1935/live/46.stream/playlist.m3u8&cctvname=L010046', '시청', 3)`);
    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.52:1935/live/133.stream/playlist.m3u8&cctvname=L010110', '을지로1가', 3)`);
    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.52:1935/live/262.stream/playlist.m3u8&cctvname=L010206', '을지로2가', 3)`);
    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.53:1935/live/553.stream/playlist.m3u8&cctvname=L010293', '서울광장', 3)`);
    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.52:1935/live/183.stream/playlist.m3u8&cctvname=L010160', '명동입구', 3)`);

    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.52:1935/live/121.stream/playlist.m3u8&cctvname=L010098', '종로1가', 5)`);
    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.52:1935/live/123.stream/playlist.m3u8&cctvname=L010100', '종로3가', 5)`);
    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.52:1935/live/255.stream/playlist.m3u8&cctvname=L010199', '청계5가', 5)`);
    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.52:1935/live/126.stream/playlist.m3u8&cctvname=L010103', '청계6가', 5)`);
    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.52:1935/live/257.stream/playlist.m3u8&cctvname=L010201', '동묘앞역', 5)`);

    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.51:1935/live/32.stream/playlist.m3u8&cctvname=L010032', '동교동삼거리', 6)`);
    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.53:1935/live/557.stream/playlist.m3u8&cctvname=L010297', '홍대입구역', 6)`);

    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.51:1935/live/184.stream/playlist.m3u8&cctvname=L010161', '경복궁역', 7)`);

    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.51:1935/live/48.stream/playlist.m3u8&cctvname=L010048', '광화문', 8)`);
    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.52:1935/live/109.stream/playlist.m3u8&cctvname=L010086', '안국역', 8)`);
    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.53:1935/live/552.stream/playlist.m3u8&cctvname=L010292', '광화문광장', 8)`);
    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.51:1935/live/47.stream/playlist.m3u8&cctvname=L010047', '세종로', 8)`);

    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.53:1935/live/284.stream/playlist.m3u8&cctvname=L010222', '원남R', 9)`);
    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.52:1935/live/124.stream/playlist.m3u8&cctvname=L010101', '종로4가', 9)`);

    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.53:1935/live/289.stream/playlist.m3u8&cctvname=L010227', '교보타워R', 10)`);
    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.52:1935/live/157.stream/playlist.m3u8&cctvname=L010134', '강남역', 10)`);

    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.51:1935/live/38.stream/playlist.m3u8&cctvname=L010038', '강남터미널', 12)`);

    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.53:1935/live/291.stream/playlist.m3u8&cctvname=L010229', '르네상스', 14)`);
    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.52:1935/live/174.stream/playlist.m3u8&cctvname=L010151', '영동전화국', 14)`);

    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.51:1935/live/55.stream/playlist.m3u8&cctvname=L010053', '신림사거리', 15)`);

    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.51:1935/live/33.stream/playlist.m3u8&cctvname=L010033', '신촌', 16)`);

    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.53:1935/live/563.stream/playlist.m3u8&cctvname=L010303', '역삼역', 17)`);

    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.54:1935/live/329.stream/playlist.m3u8&cctvname=L010242', '상암초교', 20)`);

    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.53:1935/live/287.stream/playlist.m3u8&cctvname=L010225', '을지병원R', 23)`);

    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.52:1935/live/149.stream/playlist.m3u8&cctvname=L010126', '도산공원', 27)`);

    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.52:1935/live/249.stream/playlist.m3u8&cctvname=L010193', '창덕궁R', 28)`);
    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.52:1935/live/122.stream/playlist.m3u8&cctvname=L010099', '종로2가', 28)`);

    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://211.252.223.177:1935/live/991.stream/playlist.m3u8&cctvname=E04133', '[남산1호터널] (남산)한옥마을', 30)`);
    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://211.252.223.177:1935/live/1003.stream/playlist.m3u8&cctvname=E04041', '[소파소월로] (남산)백범광장', 30)`);
    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://211.252.223.177:1935/live/990.stream/playlist.m3u8&cctvname=E04002', '[남산1호터널] (남산)1호북단', 30)`);
    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://211.252.223.177:1935/live/1004.stream/playlist.m3u8&cctvname=E04021', '[소파소월로] (남산)도서관', 30)`);
    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://211.252.223.177:1935/live/983.stream/playlist.m3u8&cctvname=E04155', '[남산1호터널] (남산)1-북-800', 30)`);
    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://211.252.223.177:1935/live/985.stream/playlist.m3u8&cctvname=E04154', '[남산1호터널] (남산)1-남-100', 30)`);
    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://211.252.223.177:1935/live/987.stream/playlist.m3u8&cctvname=E04153', '[남산1호터널] (남산)1-남-800', 30)`);
    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://211.252.223.177:1935/live/1008.stream/playlist.m3u8&cctvname=E04042', '[소파소월로] (남산)버티고개', 30)`);
    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.52:1935/live/145.stream/playlist.m3u8&cctvname=L010122', '북한남', 30)`);
    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://211.252.223.177:1935/live/982.stream/playlist.m3u8&cctvname=E04156', '[남산1호터널] (남산)1-북-400', 30)`);

    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://211.252.223.176:1935/live/947.stream/playlist.m3u8&cctvname=E04120', '[강변북로] 청담대교 북단', 31)`);

    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.51:1935/live/18.stream/playlist.m3u8&cctvname=L010018', '성산대교북단', 32)`);
    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://211.252.223.176:1935/live/237.stream/playlist.m3u8&cctvname=E04073', '[강변북로] 양화대교 북단', 32)`);
    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.51:1935/live/185.stream/playlist.m3u8&cctvname=L010162', '합정역', 32)`);
    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.51:1935/live/31.stream/playlist.m3u8&cctvname=L010031', '양화대교북단', 32)`);

    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://211.252.223.176:1935/live/474.stream/playlist.m3u8&cctvname=E04035', '[올림픽대로] 반포대교1~한남대교1', 33)`);
    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://211.252.223.176:1935/live/711.stream/playlist.m3u8&cctvname=E04038', '[올림픽대로] 반포주공아파트 앞', 33)`);

    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.52:1935/live/143.stream/playlist.m3u8&cctvname=L010120', '용비IC', 36)`);
    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://211.252.223.176:1935/live/945.stream/playlist.m3u8&cctvname=E04058', '[강변북로] 성수대교', 36)`);

    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.51:1935/live/75.stream/playlist.m3u8&cctvname=L010073', '가양대교북단', 37)`);

    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://211.252.223.176:1935/live/221.stream/playlist.m3u8&cctvname=E04084', '[강변북로] 원효대교 북단', 38)`);

    await queryRunner.query(`INSERT INTO \`exit\`.cctv (src, cctvname, placeIdx) VALUES ('/SeoulRtd/cctv?src=http://210.179.218.52:1935/live/165.stream/playlist.m3u8&cctvname=L010142', '종합운동장', 39)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
