import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import * as path from 'path';
import { config } from '@lib/config';

export class MysqlConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const entityPath = path.join(__dirname, './**/*.entity.{ts,js}');
    return {
      type: 'mysql',
      host: config.mysqlHost,
      port: config.mysqlPort,
      username: config.mysqlUsername,
      password: config.mysqlPassword,
      database: config.mysqlDatabase,
      entities: [entityPath],
      timezone: 'Z',
      logging: false,
      synchronize: false,
      keepConnectionAlive: true,
      // autoLoadEntities: true,
    };
  }
}
