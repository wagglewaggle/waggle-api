import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, EntityManager, Repository } from 'typeorm';
import { PinPlace } from '@lib/entity/pin-place/pin-place.entity';
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

  async addPinPlace(pinPlace: PinPlace, manager?: EntityManager) {
    if (manager) {
      return manager.save(PinPlace, pinPlace);
    }
    return this.repository.save(pinPlace);
  }

  async getPinPlaces(user: UserEntity): Promise<PinPlace[]> {
    const queryBuilder = this.createQueryBuilder()
      .leftJoinAndSelect('pinPlace.user', 'user')
      .leftJoinAndSelect('pinPlace.sktPlace', 'sktPlace')
      .leftJoinAndSelect('sktPlace.population', 'sktPopulation')
      .leftJoinAndSelect('pinPlace.ktPlace', 'ktPlace')
      .leftJoinAndSelect('ktPlace.population', 'ktPopulation')
      .where('user.idx = :userIdx', { userIdx: user.idx })
      .orderBy('ktPlace.idx', 'ASC')
      .addOrderBy('sktPlace.idx', 'ASC');

    return await queryBuilder.getMany();
  }
}
