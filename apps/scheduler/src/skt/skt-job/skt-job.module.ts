import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SktPlace } from '@lib/entity/skt-place/skt-place.entity';
import { SktPlaceModule } from '../skt-place/skt-place.module';
import { SktPopulationModule } from '../skt-population/skt-population.module';
import { SktJobService } from './skt-job.service';

@Module({
  imports: [TypeOrmModule.forFeature([SktPlace]), SktPlaceModule, SktPopulationModule],
  providers: [SktJobService],
  exports: [TypeOrmModule],
})
export class SktJobModule {}
