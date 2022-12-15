import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SktPopulation } from '@lib/entity/skt-population/skt-population.entity';
import { SktPopulationRepository } from './skt-population.repository';
import { SktPopulationService } from './skt-population.service';

@Module({
  imports: [TypeOrmModule.forFeature([SktPopulation])],
  providers: [SktPopulationService, SktPopulationRepository],
  exports: [TypeOrmModule, SktPopulationService],
})
export class SktPopulationModule {}
