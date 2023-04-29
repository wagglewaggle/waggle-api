import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KtPlace } from 'waggle-entity/dist/kt-place/kt-place.entity';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class KtPlaceRepository {
  constructor(@InjectRepository(KtPlace) private readonly repository: Repository<KtPlace>) {}

  async getKtPlace(where?: FindOptionsWhere<KtPlace>, relations?: string[]): Promise<KtPlace[]> {
    const options: FindManyOptions = { where };
    if (Array.isArray(relations)) {
      options.relations = relations;
    }
    return await this.repository.find(options);
  }
}
