import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { SktPlace } from 'waggle-entity/dist/skt-place/skt-place.entity';
import { SktPlaceListFilterQueryDto } from './skt-place.dto';
import { SktPlaceStatus } from 'waggle-entity/dist/skt-place/skt-place.constant';
import { Category } from 'waggle-entity/dist/category/category.entity';

@Injectable()
export class SktPlaceRepository {
  constructor(@InjectRepository(SktPlace) private readonly repository: Repository<SktPlace>) {}

  createQueryBuilder(alias = 'sktPlace') {
    return this.repository.createQueryBuilder(alias);
  }

  async getSktPlace(where: FindOptionsWhere<SktPlace>, relation?: string[]): Promise<SktPlace[]> {
    const options: any = { where };
    if (Array.isArray(relation)) {
      options.relations = relation;
    }
    return this.repository.find(options);
  }

  async getSktPlaces(query: SktPlaceListFilterQueryDto): Promise<[SktPlace[], number]> {
    const queryBuilder = this.createQueryBuilder()
      .leftJoinAndSelect('sktPlace.population', 'population')
      .leftJoinAndSelect('sktPlace.categories', 'category')
      .leftJoinAndSelect('category.type', 'categoryType')
      .where('sktPlace.status = :status', { status: SktPlaceStatus.Activated });

    if (query.level) {
      queryBuilder.andWhere('population.level = :level', { level: query.level });
    }

    if (query.category) {
      queryBuilder
        .andWhere((qb) => {
          const subQuery = qb
            .subQuery()
            .select('category.sktPlaceIdx')
            .from(Category, 'category')
            .leftJoin('category.type', 'categoryType')
            .where('categoryType.type = :type')
            .andWhere('category.sktPlaceIdx IS NOT NULL')
            .getQuery();
          return 'category.sktPlaceIdx IN ' + subQuery;
        })
        .setParameters({ type: query.category });
    }

    if (query.populationSort) {
      queryBuilder.orderBy('population.level', 'ASC');
    } else {
      queryBuilder.orderBy('population.level', 'DESC');
    }

    const [places, count] = await queryBuilder.getManyAndCount();
    return [places, count];
  }
}
