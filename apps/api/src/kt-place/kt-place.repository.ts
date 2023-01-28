import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { KtPlace } from '@lib/entity/kt-place/kt-place.entity';
import { KtPlaceListFilterQueryDto } from './kt-place.dto';

@Injectable()
export class KtPlaceRepository {
  constructor(@InjectRepository(KtPlace) private readonly repository: Repository<KtPlace>) {}

  createQueryBuilder(alias = 'ktPlace') {
    return this.repository.createQueryBuilder(alias);
  }

  async getKtPlace(where: FindOptionsWhere<KtPlace>, relation?: string[]): Promise<KtPlace[]> {
    const options: any = { where };
    if (Array.isArray(relation)) {
      options.relations = relation;
    }
    return this.repository.find(options);
  }

  async getKtPlaces(query: KtPlaceListFilterQueryDto): Promise<[KtPlace[], number]> {
    const queryBuilder = this.createQueryBuilder()
      .leftJoinAndSelect('ktPlace.population', 'population')
      .leftJoinAndSelect('ktPlace.categories', 'category');

    if (query.level) {
      queryBuilder.andWhere('population.level = :level', { level: query.level });
    }

    if (query.category) {
      queryBuilder.andWhere('category.type = :type', { type: query.category });
    }

    if (query.populationSort) {
      queryBuilder.orderBy('population.level', 'DESC');
    } else {
      queryBuilder.orderBy('population.level', 'ASC');
    }

    const [places, count] = await queryBuilder.getManyAndCount();
    return [places, count];
  }
}
