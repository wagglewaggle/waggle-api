import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from 'waggle-entity/dist/location/location.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { KtPlaceStatus } from 'waggle-entity/dist/kt-place/kt-place.constant';
import { SktPlaceStatus } from 'waggle-entity/dist/skt-place/skt-place.constant';
import { KtPlace } from 'waggle-entity/dist/kt-place/kt-place.entity';
import { SktPlace } from 'waggle-entity/dist/skt-place/skt-place.entity';

@Injectable()
export class LocationRepository {
  constructor(@InjectRepository(Location) private readonly repository: Repository<Location>) {}

  async getLocationAll(): Promise<[Location[], number]> {
    return this.repository.findAndCount();
  }

  async getLocation(where: FindOptionsWhere<Location>, relation?: string[]): Promise<Location> {
    const options: any = { where };
    if (Array.isArray(relation)) {
      options.relations = relation;
    }
    return this.repository.findOne(options);
  }

  async getNearByLocation(name: string, duplicatePlace?: KtPlace | SktPlace): Promise<Location> {
    const queryBuilder = this.repository
      .createQueryBuilder('location')
      .leftJoinAndSelect('location.ktPlaces', 'ktPlace', 'ktPlace.status = :ktPlaceStatus', { ktPlaceStatus: KtPlaceStatus.Activated })
      .leftJoinAndSelect('ktPlace.population', 'ktPlacePopulation')
      .leftJoinAndSelect('ktPlace.categories', 'ktPlaceCategories')
      .leftJoinAndSelect('ktPlaceCategories.type', 'ktPlaceCategoryType')
      .leftJoinAndSelect('location.sktPlaces', 'sktPlace', 'sktPlace.status = :sktPlaceStatus', { sktPlaceStatus: SktPlaceStatus.Activated })
      .leftJoinAndSelect('sktPlace.population', 'sktPlacePopulation')
      .leftJoinAndSelect('sktPlace.categories', 'sktPlaceCategories')
      .leftJoinAndSelect('sktPlaceCategories.type', 'sktPlaceCategoryType')
      .where('location.name = :name', { name });

    if (duplicatePlace) {
      if (duplicatePlace instanceof KtPlace) {
        queryBuilder.andWhere('ktPlace.idx != :idx', { idx: duplicatePlace.idx });
      } else {
        queryBuilder.andWhere('sktPlace.idx != :idx', { idx: duplicatePlace.idx });
      }
    }

    const result = await queryBuilder.getOne();
    if (result) {
      return result;
    }
    return undefined;
  }
}
