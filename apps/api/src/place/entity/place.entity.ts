import { Category } from 'waggle-entity/dist/category/category.entity';
import { KtPlace } from 'waggle-entity/dist/kt-place/kt-place.entity';
import { KtPopulation } from 'waggle-entity/dist/kt-population/kt-population.entity';
import { SktPlace } from 'waggle-entity/dist/skt-place/skt-place.entity';
import { SktPopulation } from 'waggle-entity/dist/skt-population/skt-population.entity';
import { HttpStatus } from '@nestjs/common';
import { KtPopulationLevel } from 'waggle-entity/dist/kt-population/kt-population.constant';
import { SktPopulationLevel } from 'waggle-entity/dist/skt-population/skt-population.constant';
import ERROR_CODE from '../../app/exceptions/error-code';
import { ClientRequestException } from '../../app/exceptions/request.exception';
import { PopulationLevel } from '../place.constant';
import { PlaceType } from '../../app/app.constant';
import { plainToInstance } from 'class-transformer';
import { Province } from 'waggle-entity/dist/province/province.entity';
import { Location } from 'waggle-entity/dist/location/location.entity';
import { PinPlace } from 'waggle-entity/dist/pin-place/pin-place.entity';
import { ReviewPost } from 'waggle-entity/dist/review-post/review-post.entity';
import { Cctv } from 'waggle-entity/dist/cctv/cctv.entity';
import { ExtraPlace } from 'waggle-entity/dist/extra-place/extra-place.entity';

export class PlaceEntity {
  readonly idx: number;
  readonly name: string;
  readonly address: string;
  readonly x: number;
  readonly y: number;
  readonly province: Province;
  readonly location: Location;
  readonly categories: Category[];
  readonly pinPlaces: PinPlace[];
  readonly reviewPosts: ReviewPost[];
  readonly population: KtPopulation | SktPopulation;
  readonly type: PlaceType;
  readonly cctvs?: Cctv[];

  constructor(place: KtPlace | SktPlace | ExtraPlace) {
    Object.assign(this, place);

    if (place instanceof KtPlace) {
      this.type = PlaceType.Kt;
    } else if (place instanceof SktPlace) {
      this.type = PlaceType.Skt;
    } else {
      this.type = PlaceType.Extra;
    }
  }

  getInstancePlaceType() {
    switch (this.type) {
      case PlaceType.Kt:
        return plainToInstance(KtPlace, this);
      case PlaceType.Skt:
        return plainToInstance(SktPlace, this);
      case PlaceType.Extra:
        return plainToInstance(ExtraPlace, this);
      default:
        throw new ClientRequestException(ERROR_CODE.ERR_0000001, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  static getPopulationLevel(ktLevel?: KtPopulationLevel, sktLevel?: SktPopulationLevel): number {
    if (ktLevel === undefined && sktLevel === undefined) {
      throw new ClientRequestException(ERROR_CODE.ERR_0000001, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const priorityLevel = Object.values(PopulationLevel) as string[];
    let result = -1;
    if (ktLevel) {
      result = priorityLevel.findIndex((level) => level === ktLevel);
    }
    if (sktLevel) {
      result = priorityLevel.findIndex((level) => level === sktLevel);
    }

    if (result === -1) {
      throw new ClientRequestException(ERROR_CODE.ERR_0000001, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return result;
  }

  static getRefinedPlaces(ktPlaces: KtPlace[], sktPlaces: SktPlace[], extraPlaces: ExtraPlace[], sortType = false) {
    const places: PlaceEntity[] = [];
    const ktLength = ktPlaces.length;
    const sktLength = sktPlaces.length;

    let ktIdx = 0,
      sktIdx = 0;

    while (ktIdx < ktLength && sktIdx < sktLength) {
      while (
        ktIdx < ktLength &&
        sktIdx < sktLength &&
        this.getPopulationLevel(ktPlaces[ktIdx].population.level) <= this.getPopulationLevel(undefined, sktPlaces[sktIdx].population.level)
      ) {
        if (sortType) {
          places.push(new PlaceEntity(sktPlaces[sktIdx++]));
        } else {
          places.push(new PlaceEntity(ktPlaces[ktIdx++]));
        }
      }

      while (
        ktIdx < ktLength &&
        sktIdx < sktLength &&
        this.getPopulationLevel(ktPlaces[ktIdx].population.level) > this.getPopulationLevel(undefined, sktPlaces[sktIdx].population.level)
      ) {
        if (sortType) {
          places.push(new PlaceEntity(ktPlaces[ktIdx++]));
        } else {
          places.push(new PlaceEntity(sktPlaces[sktIdx++]));
        }
      }
    }

    while (ktIdx < ktLength) places.push(new PlaceEntity(ktPlaces[ktIdx++]));
    while (sktIdx < sktLength) places.push(new PlaceEntity(sktPlaces[sktIdx++]));

    extraPlaces.forEach((place) => places.push(new PlaceEntity(place)));

    return places;
  }
}
