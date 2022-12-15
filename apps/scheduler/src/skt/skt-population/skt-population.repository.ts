import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, FindOptionsWhere, Repository } from 'typeorm';
import { SktPopulation } from '@lib/entity/skt-population/skt-population.entity';

@Injectable()
export class SktPopulationRepository {
  constructor(
    @InjectRepository(SktPopulation)
    private readonly repository: Repository<SktPopulation>,
  ) {}

  async addSktPopulation(sktPopulation: SktPopulation, manager?: EntityManager): Promise<SktPopulation> {
    if (manager) {
      return manager.save(SktPopulation, sktPopulation);
    }
    return this.repository.save(sktPopulation);
  }

  async getSktPopulation(where: FindOptionsWhere<SktPopulation>, relations?: string[]): Promise<SktPopulation[]> {
    const options: any = { where };
    if (Array.isArray(relations)) {
      options.relations = relations;
    }
    return await this.repository.findBy(where);
  }
}
