import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import * as path from 'path';
// import { config } from '@lib/config';

export class MysqlConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const entityPath = path.join(__dirname, './**/*.entity.{ts,js}');
    return {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'exit',
      entities: [entityPath],
      timezone: 'Z',
      logging: false,
      synchronize: false,
      keepConnectionAlive: true,
      // autoLoadEntities: true,
    };
  }
}
