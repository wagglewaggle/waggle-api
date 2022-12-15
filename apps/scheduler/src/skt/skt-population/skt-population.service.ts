import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { SktPlace } from '@lib/entity/skt-place/skt-place.entity';
import { SktPopulation } from '@lib/entity/skt-population/skt-population.entity';
import { SktPopulationRepository } from './skt-population.repository';

@Injectable()
export class SktPopulationService {
  constructor(private readonly sktPopulationRepository: SktPopulationRepository) {}

  async addSktPopulation(sktPopulation: SktPopulation, manager?: EntityManager): Promise<SktPopulation> {
    return this.sktPopulationRepository.addSktPopulation(sktPopulation, manager);
  }

  async getSktPopulation(place: SktPlace): Promise<SktPopulation> {
    return (await this.sktPopulationRepository.getSktPopulation({ place }, ['place']))[0];
  }
}
