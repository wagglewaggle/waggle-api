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
  readonly x: number;
  readonly y: number;
  readonly categories: Category[];
  readonly population: KtPopulation | SktPopulation;
  readonly type: PlaceType;

  constructor(place: KtPlace | SktPlace) {
    this.idx = place.idx;
    this.name = place.name;
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
}
