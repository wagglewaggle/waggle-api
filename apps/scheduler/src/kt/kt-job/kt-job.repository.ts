import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KtPlace } from 'waggle-entity/dist/kt-place/kt-place.entity';
import { KtPopulation } from 'waggle-entity/dist/kt-population/kt-population.entity';

@Injectable()
export class KtJobRepository {
  constructor(
    @InjectRepository(KtPlace)
    private readonly ktPlaceRepository: Repository<KtPlace>,
    @InjectRepository(KtPopulation)
    private readonly ktPopulationRepositort: Repository<KtPopulation>,
  ) {}

  createQueryBuilder(alias = 'ktPlace') {
    return this.ktPlaceRepository.createQueryBuilder(alias);
  }

  async getKtPlaces() {
    const queryBuilder = this.createQueryBuilder();

    return await queryBuilder.getManyAndCount();
  }
}
