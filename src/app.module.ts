import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestMiddleware } from './app/middlewares/request.middleware';
import { MysqlConfigService } from './app/mysql/mysql-config.service';
import { ProvinceModule } from './province/province.module';
import { KtPlaceModule } from './kt-place/kt-place.module';
import { HealthModule } from './health/health.module';
import { LocationModule } from './location/location.module';
import { SktPlaceModule } from './skt-place/skt-place.module';
import { CategoryModule } from './category/category.module';
import { LoggerModule } from './app/logger/logger.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './app/interceptors/logging.interceptor';
import { AllExceptionFilter } from './app/filters/all-exception.filter';
import { CategoryTypeModule } from './category-type/category-type.module';

export const TypeOrmRootModule = TypeOrmModule.forRootAsync({
  useClass: MysqlConfigService,
});

@Module({
  imports: [TypeOrmRootModule, LoggerModule, ProvinceModule, KtPlaceModule, HealthModule, LocationModule, SktPlaceModule, CategoryModule, CategoryTypeModule],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_FILTER, useClass: AllExceptionFilter },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(RequestMiddleware).forRoutes('*');
  }
}
