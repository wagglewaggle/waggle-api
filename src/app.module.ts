import { MysqlConfigService } from '@lib/entity/mysql-config.service';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestMiddleware } from './app/middlewares/request.middleware';
import { CityDataModule } from './city-data/city-data.module';
import { ProvinceModule } from './province/province.module';

export const TypeOrmRootModule = TypeOrmModule.forRootAsync({
  useClass: MysqlConfigService,
});

@Module({
  imports: [TypeOrmRootModule, CityDataModule, ProvinceModule],
  providers: [
    // { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    // { provide: APP_FILTER, useClass: AllExceptionFilter },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(RequestMiddleware).forRoutes('*');
  }
}
