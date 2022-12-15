import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { KtPopulation } from '@lib/entity/kt-population/kt-population.entity';
import { KtPopulationRepository } from './kt-population.repository';

@Injectable()
export class KtPopulationService {
  constructor(private readonly ktPopulationRepository: KtPopulationRepository) {}

  async addKtPopulation(ktPopulation: KtPopulation, manager?: EntityManager): Promise<KtPopulation> {
    return this.ktPopulationRepository.addKtPopulation(ktPopulation, manager);
  }
}
