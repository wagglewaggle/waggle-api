import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { KtAccident } from 'waggle-entity/dist/kt-accident/kt-accident.entity';
import { KtAccidentRepository } from './kt-accident.repository';
import { KtPlace } from 'waggle-entity/dist/kt-place/kt-place.entity';

@Injectable()
export class KtAccidentService {
  constructor(private readonly ktAccidentRepository: KtAccidentRepository) {}

  async addKtAccident(accident: KtAccident, manager?: EntityManager): Promise<KtAccident> {
    return await this.ktAccidentRepository.addKtAccident(accident, manager);
  }

  async getKtAccidents(place: KtPlace): Promise<KtAccident[]> {
    return await this.ktAccidentRepository.getKtAccident({ place });
  }

  async deleteKtAccident(accident: KtAccident, manager?: EntityManager) {
    return await this.ktAccidentRepository.deleteKtAccident(accident, manager);
  }
}
