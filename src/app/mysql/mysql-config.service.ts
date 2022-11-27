import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import * as path from 'path';
import { config } from '../config/config.service';

export class MysqlConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const entityPath = path.join(__dirname, './**/*.entity.{ts,js}');
    console.log(entityPath);
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
      synchronize: true,
      keepConnectionAlive: true,
      // autoLoadEntities: true,
    };
  }
}
