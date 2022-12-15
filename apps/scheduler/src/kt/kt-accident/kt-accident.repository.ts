import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { KtAccident } from '@lib/entity/kt-accident/kt-accident.entity';

@Injectable()
export class KtAccidentRepository {
  constructor(
    @InjectRepository(KtAccident)
    private readonly ktAccidentRepository: Repository<KtAccident>,
  ) {}

  async addKtAccident(accident: KtAccident, manager?: EntityManager): Promise<KtAccident> {
    if (manager) {
      return await manager.save(KtAccident, accident);
    }
    return await this.ktAccidentRepository.save(accident);
  }
}
