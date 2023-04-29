import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { KtPlace } from '@lib/entity/kt-place/kt-place.entity';
import { PlaceListFilterQueryDto } from '../place/place.dto';
import { PopulationLevel } from '../place/place.constant';
import { ReviewPostStatus } from '@lib/entity/review-post/review-post.constant';

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

  async getKtPlaces(query: PlaceListFilterQueryDto): Promise<[KtPlace[], number]> {
    const queryBuilder = this.createQueryBuilder()
      .leftJoinAndSelect('ktPlace.population', 'population')
      .leftJoinAndSelect('ktPlace.categories', 'category')
      .leftJoinAndSelect('ktPlace.cctvs', 'cctv')
      .leftJoinAndSelect('ktPlace.pinPlaces', 'pinPlace')
      .leftJoinAndSelect('ktPlace.reviewPosts', 'reviewPost', 'reviewPost.status = :status', { status: ReviewPostStatus.Activated });

    if (query.level) {
      if (query.level === PopulationLevel.VeryRelaxation) {
        return [[], 0];
      }
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

  async getPlaceAllInfo(idx: number): Promise<KtPlace | null> {
    const queryBuilder = this.createQueryBuilder('targetPlace')
      .leftJoinAndSelect('targetPlace.population', 'population')
      .leftJoinAndSelect('targetPlace.accidents', 'accident')
      .leftJoinAndSelect('targetPlace.cctvs', 'cctv')
      .leftJoinAndSelect('targetPlace.ktRoadTraffic', 'ktRoadTraffic')
      .leftJoinAndSelect('targetPlace.pinPlaces', 'pinPlace')
      .leftJoinAndSelect('targetPlace.reviewPosts', 'reviewPost', 'reviewPost.status = :status', { status: ReviewPostStatus.Activated })
      .leftJoinAndSelect('targetPlace.location', 'location');

    queryBuilder
      .leftJoinAndSelect('location.ktPlaces', 'ktPlace')
      .leftJoinAndSelect('ktPlace.population', 'ktPlacePopulation')
      .leftJoinAndSelect('ktPlace.categories', 'ktPlaceCategory')
      .leftJoinAndSelect('ktPlace.cctvs', 'ktPlaceCctv')
      .leftJoinAndSelect('ktPlace.pinPlaces', 'ktPlacePinPlace')
      .leftJoinAndSelect('ktPlace.reviewPosts', 'ktPlaceReviewPost', 'ktPlaceReviewPost.status = :status', { status: ReviewPostStatus.Activated });

    queryBuilder
      .leftJoinAndSelect('location.sktPlaces', 'sktPlace')
      .leftJoinAndSelect('sktPlace.population', 'sktPlacePopulation')
      .leftJoinAndSelect('sktPlace.categories', 'sktPlaceCategory')
      .leftJoinAndSelect('sktPlace.pinPlaces', 'sktPlacePinPlace')
      .leftJoinAndSelect('sktPlace.reviewPosts', 'sktPlaceReviewPost', 'sktPlaceReviewPost.status = :status', { status: ReviewPostStatus.Activated });

    queryBuilder
      .leftJoinAndSelect('location.extraPlaces', 'extraPlace')
      .leftJoinAndSelect('extraPlace.categories', 'extraPlaceCategory')
      .leftJoinAndSelect('extraPlace.pinPlaces', 'extraPlacePinPlace')
      .leftJoinAndSelect('extraPlace.reviewPosts', 'extraPlaceReviewPost', 'extraPlaceReviewPost.status = :status', {
        status: ReviewPostStatus.Activated,
      });

    queryBuilder.where('targetPlace.idx = :idx', { idx });

    return queryBuilder.getOne();
  }
}
