import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { KtPlace } from '../app/entities/kt-place/kt-place.entity';

@Injectable()
export class KtPlaceRepository {
  constructor(
    @InjectRepository(KtPlace) private readonly repository: Repository<KtPlace>,
  ) {}

  async getKtPlace(
    where: FindOptionsWhere<KtPlace>,
    relation?: string[],
  ): Promise<KtPlace[]> {
    const options: any = { where };
    if (Array.isArray(relation)) {
      options.relations = relation;
    }
    return this.repository.find(options);
  }
}
