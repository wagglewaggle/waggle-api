import { Module } from '@nestjs/common';
import { KtJobService } from './kt-job.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KtPlace } from '@lib/entity/kt-place/kt-place.entity';
import { KtPopulation } from '@lib/entity/kt-population/kt-population.entity';
import { KtPlaceModule } from '../kt-place/kt-place.module';
import { KtPopulationModule } from '../kt-population/kt-population.module';
import { KtAccidentModule } from '../kt-accident/kt-accident.module';
import { KtRoadTrafficModule } from '../kt-road-traffic/kt-road-traffic.module';
import { SentryModule } from '../../app/sentry/sentry.module';
import { LoggerModule } from '../../app/logger/logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([KtPlace, KtPopulation]),
    KtPlaceModule,
    KtPopulationModule,
    KtAccidentModule,
    KtRoadTrafficModule,
    SentryModule,
    LoggerModule,
  ],
  providers: [KtJobService],
})
export class KtJobModule {}
