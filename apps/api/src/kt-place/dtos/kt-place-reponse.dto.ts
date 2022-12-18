import { Exclude, Expose } from 'class-transformer';
import { Cctv } from '@lib/entity/cctv/cctv.entity';
import { KtAccident } from '@lib/entity/kt-accident/kt-accident.entity';
import { KtPopulation } from '@lib/entity/kt-population/kt-population.entity';
import { KtPlace } from '@lib/entity/kt-place/kt-place.entity';
import { KtPopulationResponseDto } from './kt-population-response.dto';
import { KtAccidentResponseDto } from './kt-accident-response.dto';
import { Category } from '@lib/entity/category/category.entity';
import { CategoryResponseDto } from '../../category/dtos/category-response.dto';

export class KtPlaceResponseDto {
  @Exclude() private readonly _idx: number;
  @Exclude() private readonly _name: string;
  @Exclude() private readonly _x: number;
  @Exclude() private readonly _y: number;
  @Exclude() private readonly _categories: Category[] | undefined;
  @Exclude() private readonly _populations: KtPopulation[] | undefined;
  @Exclude() private readonly _accidents: KtAccident[] | undefined;
  @Exclude() private readonly _cctvs: Cctv[] | undefined;

  constructor(place: KtPlace) {
    this._idx = place.idx;
    this._name = place.name;
    this._x = place.x;
    this._y = place.y;
    this._categories = place.categories;
    this._populations = place.populations;
    this._accidents = place.accidents;
    this._cctvs = place.cctvs;
  }

  @Expose()
  get idx(): number {
    return this._idx;
  }

  @Expose()
  get name(): string {
    return this._name;
  }

  @Expose()
  get x(): number {
    return this._x;
  }

  @Expose()
  get y(): number {
    return this._y;
  }

  @Expose()
  get categories(): CategoryResponseDto[] | undefined {
    if (!this._categories) {
      return undefined;
    }
    return this._categories.map((category) => new CategoryResponseDto(category));
  }

  @Expose()
  get populations(): KtPopulationResponseDto[] | undefined {
    if (!this._populations) {
      return undefined;
    }
    return this._populations.map((population) => new KtPopulationResponseDto(population));
  }

  @Expose()
  get accidents(): KtAccidentResponseDto[] | undefined {
    if (!this._accidents) {
      return undefined;
    }
    return this._accidents.map((accident) => new KtAccidentResponseDto(accident));
  }
}
