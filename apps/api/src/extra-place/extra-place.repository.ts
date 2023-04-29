import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ExtraPlace } from '@lib/entity/extra-place/extra-place.entity';
import { PlaceListFilterQueryDto } from '../place/place.dto';
import { ReviewPostStatus } from '@lib/entity/review-post/review-post.constant';

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
      .leftJoinAndSelect('extraPlace.reviewPosts', 'reviewPost', 'reviewPost.status = :status', { status: ReviewPostStatus.Activated });

    if (query.category) {
      queryBuilder.andWhere('category.type = :type', { type: query.category });
    }

    return await queryBuilder.getManyAndCount();
  }

  async getPlaceAllInfo(idx: number): Promise<ExtraPlace | null> {
    const queryBuilder = this.createQueryBuilder('targetPlace')
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
