import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { KtAccident } from '@lib/entity/kt-accident/kt-accident.entity';
import { KtAccidentRepository } from './kt-accident.repository';

@Injectable()
export class KtAccidentService {
  constructor(private readonly ktAccidentRepository: KtAccidentRepository) {}

  async addKtAccident(accident: KtAccident, manager?: EntityManager): Promise<KtAccident> {
    return await this.ktAccidentRepository.addKtAccident(accident, manager);
  }
}
