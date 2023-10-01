import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { KtPlace } from 'waggle-entity/dist/kt-place/kt-place.entity';
import { KtPlaceListFilterQueryDto } from './kt-place.dto';
import { KtPlaceStatus } from 'waggle-entity/dist/kt-place/kt-place.constant';
import { Category } from 'waggle-entity/dist/category/category.entity';

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

  async getActivatedKtPlaces(query: KtPlaceListFilterQueryDto): Promise<[KtPlace[], number]> {
    const queryBuilder = this.createQueryBuilder()
      .leftJoinAndSelect('ktPlace.population', 'population')
      .leftJoinAndSelect('ktPlace.categories', 'category')
      .leftJoinAndSelect('category.type', 'categoryType')
      .where('ktPlace.status = :status', { status: KtPlaceStatus.Activated });

    if (query.level) {
      queryBuilder.andWhere('population.level = :level', { level: query.level });
    }

    if (query.category) {
      queryBuilder
        .andWhere((qb) => {
          const subQuery = qb
            .subQuery()
            .select('category.ktPlaceIdx')
            .from(Category, 'category')
            .leftJoin('category.type', 'categoryType')
            .where('categoryType.type = :type')
            .andWhere('category.ktPlaceIdx IS NOT NULL')
            .getQuery();
          return 'category.ktPlaceIdx IN ' + subQuery;
        })
        .setParameters({ type: query.category });
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
