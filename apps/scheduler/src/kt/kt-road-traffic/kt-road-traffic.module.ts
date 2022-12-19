import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KtRoadTraffic } from '@lib/entity/kt-road-traffic/kt-road-traffic.entity';
import { KtRoadTrafficService } from './kt-road-traffic.service';
import { KtRoadTrafficRepository } from './kt-road-traffic.repository';

@Module({
  imports: [TypeOrmModule.forFeature([KtRoadTraffic])],
  providers: [KtRoadTrafficService, KtRoadTrafficRepository],
  exports: [TypeOrmModule, KtRoadTrafficService],
})
export class KtRoadTrafficModule {}
