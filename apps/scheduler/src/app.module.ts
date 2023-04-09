import { HttpException, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SktJobModule } from './skt/skt-job/skt-job.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KtJobModule } from './kt/kt-job/kt-job.module';
import { KtPlaceModule } from './kt/kt-place/kt-place.module';
import { KtPopulationModule } from './kt/kt-population/kt-population.module';
import { KtAccidentModule } from './kt/kt-accident/kt-accident.module';
import { MysqlConfigService } from '@lib/entity/mysql-config.service';
import { KtRoadTrafficModule } from './kt/kt-road-traffic/kt-road-traffic.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RavenInterceptor, RavenModule } from 'nest-raven';
import { LoggerModule } from './app/logger/logger.module';

export const TypeOrmRootModule = TypeOrmModule.forRootAsync({
  useClass: MysqlConfigService,
});

@Module({
  imports: [
    RavenModule,
    ScheduleModule.forRoot(),
    TypeOrmRootModule,
    KtJobModule,
    KtPlaceModule,
    KtPopulationModule,
    KtAccidentModule,
    SktJobModule,
    KtRoadTrafficModule,
    LoggerModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useValue: new RavenInterceptor({
        filters: [
          {
            type: HttpException,
          },
        ],
      }),
    },
  ],
})
export class AppModule {}
