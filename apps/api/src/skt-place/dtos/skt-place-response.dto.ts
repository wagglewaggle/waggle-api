import { Exclude, Expose } from 'class-transformer';
import { Category } from '@lib/entity/category/category.entity';
import { SktPopulation } from '@lib/entity/skt-population/skt-population.entity';
import { SktPlace } from '@lib/entity/skt-place/skt-place.entity';
import { SktPopulationResponseDto } from './skt-population-response.dto';

export class SktPlaceResponseDto {
  @Exclude() private readonly _idx: number;
  @Exclude() private readonly _poiId: string;
  @Exclude() private readonly _name: string;
  @Exclude() private readonly _x: number;
  @Exclude() private readonly _y: number;
  @Exclude() private readonly _categories: Category[];
  @Exclude() private readonly _populations: SktPopulation[];

  constructor(place: SktPlace) {
    this._idx = place.idx;
    this._poiId = place.poiId;
    this._name = place.name;
    this._x = place.x;
    this._y = place.y;
    this._categories = place.categories;
    this._populations = place.populations;
  }

  @Expose()
  get idx(): number {
    return this._idx;
  }

  @Expose()
  get poiId(): string {
    return this._poiId;
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
  get populations(): SktPopulationResponseDto[] | undefined {
    if (!this._populations) {
      return undefined;
    }
    return this._populations.map((population) => new SktPopulationResponseDto(population));
  }

  // @Expose()
  // get idx(): number {
  //   return this._idx;
  // }
}
