import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ExtraPlace } from '@lib/entity/extra-place/extra-place.entity';
import { PlaceListFilterQueryDto } from '../place/place.dto';

@Injectable()
export class ExtraPlaceRepository {
  constructor(@InjectRepository(ExtraPlace) private readonly repository: Repository<ExtraPlace>) {}

  createQueryBuilder(alias = 'extraPlace') {
    return this.repository.createQueryBuilder(alias);
  }

  async getPlace(where: FindOptionsWhere<ExtraPlace>, relations?: string[]): Promise<ExtraPlace | undefined> {
    const options: any = { where };
    if (Array.isArray(relations)) {
      options.relations = relations;
    }
    const place = await this.repository.findOne(options);
    return place || undefined;
  }

  async getPlaces(query: PlaceListFilterQueryDto): Promise<[ExtraPlace[], number]> {
    const queryBuilder = this.createQueryBuilder()
      .leftJoinAndSelect('extraPlace.categories', 'category')
      .leftJoinAndSelect('extraPlace.pinPlaces', 'pinPlace')
      .leftJoinAndSelect('extraPlace.reviewPosts', 'reviewPost');

    if (query.category) {
      queryBuilder.andWhere('category.type = :type', { type: query.category });
    }

    return await queryBuilder.getManyAndCount();
  }
}
