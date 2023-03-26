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
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './app/interceptors/logging.interceptor';
import { LoggerModule } from './app/logger/logger.module';
import { IpModule } from './ip/ip.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserRoleModule } from './user-role/user-role.module';
import { AllExceptionFilter } from './app/filters/all-exception.filter';
import { PinPlaceModule } from './pin-place/pin-place.module';
import { UserTokenModule } from './user-token/user-token.module';
import { TokenTimeLeftInterceptor } from './app/interceptors/token-time-left.interceptor';
import { PlaceModule } from './place/place.module';
import { RavenInterceptor, RavenModule } from 'nest-raven';
import { SentryModule } from './app/sentry/sentry.module';
import { ReviewPostModule } from './review-post/review-post.module';
import { ReplyModule } from './reply/reply.module';
import { PinReviewPostModule } from './pin-review-post/pin-review-post.module';
import { ExtraPlaceModule } from './extra-place/extra-place.module';
import { ReportModule } from './report/report.module';
import { ReviewPostReportModule } from './review-post-report/review-post-report.module';
import { ReplyReportModule } from './reply-report/reply-report.module';

export const TypeOrmRootModule = TypeOrmModule.forRootAsync({
  useClass: MysqlConfigService,
});

@Module({
  imports: [
    RavenModule,
    TypeOrmRootModule,
    LoggerModule,
    ProvinceModule,
    KtPlaceModule,
    HealthModule,
    LocationModule,
    SktPlaceModule,
    CategoryModule,
    IpModule,
    AuthModule,
    UserModule,
    UserRoleModule,
    PinPlaceModule,
    UserTokenModule,
    PlaceModule,
    SentryModule,
    ReviewPostModule,
    ReplyModule,
    PinReviewPostModule,
    ExtraPlaceModule,
    ReportModule,
    ReviewPostReportModule,
    ReplyReportModule,
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useValue: new RavenInterceptor() },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_INTERCEPTOR, useClass: TokenTimeLeftInterceptor },
    { provide: APP_FILTER, useClass: AllExceptionFilter },
    // { provide: APP_GUARD, useClass: IpGuard },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(RequestMiddleware).forRoutes('*');
  }
}
