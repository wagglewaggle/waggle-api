import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, EntityManager, FindOptionsWhere, Repository } from 'typeorm';
import { PinPlace } from 'waggle-entity/dist/pin-place/pin-place.entity';
import { UserEntity } from '../user/entity/user.entity';

@Injectable()
export class PinPlaceRepository {
  constructor(@InjectRepository(PinPlace) private readonly repository: Repository<PinPlace>) {}

  createInstance(pinPlace: DeepPartial<PinPlace>): PinPlace {
    return this.repository.create(pinPlace);
  }

  createQueryBuilder(alias = 'pinPlace') {
    return this.repository.createQueryBuilder(alias);
  }

  async getPinPlace(where: FindOptionsWhere<PinPlace>, relations?: string[]): Promise<PinPlace[]> {
    const options: any = { where };
    if (Array.isArray(relations)) {
      options.relations = relations;
    }
    return await this.repository.find(options);
  }

  async addPinPlace(pinPlace: PinPlace, manager?: EntityManager) {
    if (manager) {
      return manager.save(PinPlace, pinPlace);
    }
    return this.repository.save(pinPlace);
  }

  async deletePinPlace(pinPlace: PinPlace, manager?: EntityManager) {
    if (manager) {
      return manager.remove(PinPlace, pinPlace);
    }
    return this.repository.remove(pinPlace);
  }

  async getPinPlaces(user: UserEntity): Promise<PinPlace[]> {
    const queryBuilder = this.createQueryBuilder()
      .leftJoinAndSelect('pinPlace.user', 'user')
      .leftJoinAndSelect('pinPlace.sktPlace', 'sktPlace')
      .leftJoinAndSelect('sktPlace.population', 'sktPopulation')
      .leftJoinAndSelect('sktPlace.reviewPosts', 'sktReviewPost')
      .leftJoinAndSelect('sktPlace.pinPlaces', 'sktPinPlace')
      .leftJoinAndSelect('pinPlace.ktPlace', 'ktPlace')
      .leftJoinAndSelect('ktPlace.population', 'ktPopulation')
      .leftJoinAndSelect('ktPlace.cctvs', 'cctv')
      .leftJoinAndSelect('ktPlace.reviewPosts', 'ktReviewPost')
      .leftJoinAndSelect('ktPlace.pinPlaces', 'ktPinPlace')
      .leftJoinAndSelect('pinPlace.extraPlace', 'extraPlace')
      .leftJoinAndSelect('extraPlace.reviewPosts', 'extraReviewPost')
      .leftJoinAndSelect('extraPlace.pinPlaces', 'extraPinPlace')
      .where('user.idx = :userIdx', { userIdx: user.idx })
      .orderBy('pinPlace.createdDate', 'DESC');
    // .addOrderBy('sktPlace.idx', 'ASC');

    return await queryBuilder.getMany();
  }
}
