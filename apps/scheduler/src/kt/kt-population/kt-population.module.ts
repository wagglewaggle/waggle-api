import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KtPopulation } from 'waggle-entity/dist/kt-population/kt-population.entity';
import { KtPopulationRepository } from './kt-population.repository';
import { KtPopulationService } from './kt-population.service';

@Module({
  imports: [TypeOrmModule.forFeature([KtPopulation])],
  providers: [KtPopulationService, KtPopulationRepository],
  exports: [TypeOrmModule, KtPopulationService],
})
export class KtPopulationModule {}
