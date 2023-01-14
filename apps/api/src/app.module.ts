import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestMiddleware } from './app/middlewares/request.middleware';
import { MysqlConfigService } from '@lib/entity/mysql-config.service';
import { ProvinceModule } from './province/province.module';
import { KtPlaceModule } from './kt-place/kt-place.module';
import { HealthModule } from './health/health.module';
import { LocationModule } from './location/location.module';
import { SktPlaceModule } from './skt-place/skt-place.module';
import { CategoryModule } from './category/category.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './app/interceptors/logging.interceptor';
import { LoggerModule } from './app/logger/logger.module';
import { IpGuard } from './app/guards/ip.guard';
import { IpModule } from './ip/ip.module';

export const TypeOrmRootModule = TypeOrmModule.forRootAsync({
  useClass: MysqlConfigService,
});

@Module({
  imports: [TypeOrmRootModule, LoggerModule, ProvinceModule, KtPlaceModule, HealthModule, LocationModule, SktPlaceModule, CategoryModule, IpModule],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_GUARD, useClass: IpGuard },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(RequestMiddleware).forRoutes('*');
  }
}
