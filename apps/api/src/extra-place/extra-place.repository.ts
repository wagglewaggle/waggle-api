import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ExtraPlace } from '@lib/entity/extra-place/extra-place.entity';

@Injectable()
export class ExtraPlaceRepository {
  constructor(@InjectRepository(ExtraPlace) private readonly repository: Repository<ExtraPlace>) {}

  async getPlace(where: FindOptionsWhere<ExtraPlace>, relations?: string[]): Promise<ExtraPlace | undefined> {
    const options: any = { where };
    if (Array.isArray(relations)) {
      options.relations = relations;
    }
    const place = await this.repository.findOne(options);
    return place || undefined;
  }
}
