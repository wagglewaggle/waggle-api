import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { Province } from 'waggle-entity/dist/province/province.entity';

@Injectable()
export class ProvinceRepository {
  constructor(
    @InjectRepository(Province)
    private readonly repository: Repository<Province>,
  ) {}

  async getProvinces(where: FindOptionsWhere<Province>, relations?: string[]): Promise<Province[]> {
    const options: FindManyOptions = { where };
    if (relations) {
      options.relations = relations;
    }
    return this.repository.find(options);
  }
}
