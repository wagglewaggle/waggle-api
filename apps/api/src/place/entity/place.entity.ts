import { Category } from '@lib/entity/category/category.entity';
import { KtPlace } from '@lib/entity/kt-place/kt-place.entity';
import { KtPopulation } from '@lib/entity/kt-population/kt-population.entity';
import { SktPlace } from '@lib/entity/skt-place/skt-place.entity';
import { SktPopulation } from '@lib/entity/skt-population/skt-population.entity';
import { HttpStatus } from '@nestjs/common';
import { KtPopulationLevel } from '@lib/entity/kt-population/kt-population.constant';
import { SktPopulationLevel } from '@lib/entity/skt-population/skt-population.constant';
import ERROR_CODE from '../../app/exceptions/error-code';
import { ClientRequestException } from '../../app/exceptions/request.exception';
import { PopulationLevel } from '../place.constant';
import { PlaceType } from '../../app/app.constant';

export class PlaceEntity {
  readonly idx: number;
  readonly name: string;
  readonly address: string;
  readonly x: number;
  readonly y: number;
  readonly categories: Category[];
  readonly population: KtPopulation | SktPopulation;
  readonly type: PlaceType;

  constructor(place: KtPlace | SktPlace) {
    this.idx = place.idx;
    this.name = place.name;
    this.address = place.address;
    this.x = place.x;
    this.y = place.y;
    this.categories = place.categories;
    this.population = place.population;
    if (place instanceof KtPlace) {
      this.type = PlaceType.Kt;
    } else if (place instanceof SktPlace) {
      this.type = PlaceType.Skt;
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

  static getRefinedPlaces(ktPlaces: KtPlace[], sktPlaces: SktPlace[], sortType = false) {
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

    return places;
  }
}
