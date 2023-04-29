import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { KtPopulation } from 'waggle-entity/dist/kt-population/kt-population.entity';

@Injectable()
export class KtPopulationRepository {
  constructor(
    @InjectRepository(KtPopulation)
    private readonly repository: Repository<KtPopulation>,
  ) {}

  async addKtPopulation(ktPopulation: KtPopulation, manager?: EntityManager): Promise<KtPopulation> {
    if (manager) {
      return manager.save(KtPopulation, ktPopulation);
    }
    return this.repository.save(ktPopulation);
  }
}
