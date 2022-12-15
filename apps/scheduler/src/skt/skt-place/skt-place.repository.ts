import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { SktPlace } from '@lib/entity/skt-place/skt-place.entity';

@Injectable()
export class SktPlaceRepository {
  constructor(
    @InjectRepository(SktPlace)
    private readonly repository: Repository<SktPlace>,
  ) {}

  async getSktPlace(where?: FindOptionsWhere<SktPlace>, relations?: string[]): Promise<SktPlace[]> {
    const options: FindManyOptions = { where };
    if (Array.isArray(relations)) {
      options.relations = relations;
    }
    return await this.repository.find(options);
  }
}
