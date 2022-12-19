import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { KtAccident } from '@lib/entity/kt-accident/kt-accident.entity';

@Injectable()
export class KtAccidentRepository {
  constructor(
    @InjectRepository(KtAccident)
    private readonly repository: Repository<KtAccident>,
  ) {}

  async addKtAccident(accident: KtAccident, manager?: EntityManager): Promise<KtAccident> {
    if (manager) {
      return await manager.save(KtAccident, accident);
    }
    return await this.repository.save(accident);
  }

  async getKtAccident(where: FindOptionsWhere<KtAccident>, relations?: string[]): Promise<KtAccident[]> {
    const options: FindManyOptions = { where };
    if (Array.isArray(relations)) {
      options.relations = relations;
    }
    return await this.repository.find(options);
  }

  async deleteKtAccident(accident: KtAccident, manager?: EntityManager) {
    if (manager) {
      return manager.remove(KtAccident, accident);
    }
    return this.repository.remove(accident);
  }
}
