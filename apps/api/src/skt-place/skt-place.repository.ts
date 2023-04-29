import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { SktPlace } from '@lib/entity/skt-place/skt-place.entity';
import { PlaceListFilterQueryDto } from '../place/place.dto';
import { ReviewPostStatus } from '@lib/entity/review-post/review-post.constant';

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

  async getSktPlaces(query: PlaceListFilterQueryDto): Promise<[SktPlace[], number]> {
    const queryBuilder = this.createQueryBuilder()
      .leftJoinAndSelect('sktPlace.population', 'population')
      .leftJoinAndSelect('sktPlace.categories', 'category')
      .leftJoinAndSelect('sktPlace.pinPlaces', 'pinPlace')
      .leftJoinAndSelect('sktPlace.reviewPosts', 'reviewPost', 'reviewPost.status = :status', { status: ReviewPostStatus.Activated });

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

  async getPlaceAllInfo(idx: number): Promise<SktPlace | null> {
    const queryBuilder = this.createQueryBuilder('targetPlace')
      .leftJoinAndSelect('targetPlace.population', 'population')
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
