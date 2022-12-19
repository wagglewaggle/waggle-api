import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SktJobModule } from './skt/skt-job/skt-job.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KtJobModule } from './kt/kt-job/kt-job.module';
import { KtPlaceModule } from './kt/kt-place/kt-place.module';
import { KtPopulationModule } from './kt/kt-population/kt-population.module';
import { KtAccidentModule } from './kt/kt-accident/kt-accident.module';
import { MysqlConfigService } from '../../../libs/entity/src/mysql-config.service';
import { KtRoadTrafficModule } from './kt/kt-road-traffic/kt-road-traffic.module';

export const TypeOrmRootModule = TypeOrmModule.forRootAsync({
  useClass: MysqlConfigService,
});

@Module({
  imports: [ScheduleModule.forRoot(), TypeOrmRootModule, KtJobModule, KtPlaceModule, KtPopulationModule, KtAccidentModule, SktJobModule, KtRoadTrafficModule],
})
export class AppModule {}
