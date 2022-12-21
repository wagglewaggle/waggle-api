import { Exclude, Expose } from 'class-transformer';
import { Cctv } from '@lib/entity/cctv/cctv.entity';
import { KtAccident } from '@lib/entity/kt-accident/kt-accident.entity';
import { KtPopulation } from '@lib/entity/kt-population/kt-population.entity';
import { KtPlace } from '@lib/entity/kt-place/kt-place.entity';
import { KtPopulationResponseDto } from './kt-population-response.dto';
import { KtAccidentResponseDto } from './kt-accident-response.dto';
import { Category } from '@lib/entity/category/category.entity';
import { CategoryResponseDto } from '../../category/dtos/category-response.dto';
import { KtCctvResponseDto } from './kt-cctv-response.dto';
import { KtRoadTraffic } from '@lib/entity/kt-road-traffic/kt-road-traffic.entity';
import { KtRoadTrafficResponseDto } from './kt-road-traffic-response.dto';
import { Location } from '@lib/entity/location/location.entity';
import { LocationResponseDto } from '../../location/dtos/location-response.dto';

export class KtPlaceResponseDto {
  @Exclude() private readonly _idx: number;
  @Exclude() private readonly _name: string;
  @Exclude() private readonly _x: number;
  @Exclude() private readonly _y: number;
  @Exclude() private readonly _categories: Category[] | undefined;
  @Exclude() private readonly _populations: KtPopulation[] | undefined;
  @Exclude() private readonly _accidents: KtAccident[] | undefined;
  @Exclude() private readonly _cctvs: Cctv[] | undefined;
  @Exclude() private readonly _roadTraffic: KtRoadTraffic | undefined;
  @Exclude() private readonly _location: Location | undefined;

  constructor(place: KtPlace, location?: Location) {
    this._idx = place.idx;
    this._name = place.name;
    this._x = place.x;
    this._y = place.y;
    this._categories = place.categories;
    this._populations = place.populations;
    this._accidents = place.accidents;
    this._cctvs = place.cctvs;
    this._roadTraffic = place.ktRoadTraffic;
    this._location = location;
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

  @Expose()
  get cctvs(): KtCctvResponseDto[] | undefined {
    if (!this._cctvs) {
      return undefined;
    }
    return this._cctvs.map((cctv) => new KtCctvResponseDto(cctv));
  }

  @Expose()
  get roadTraffic(): KtRoadTrafficResponseDto | undefined {
    if (!this._roadTraffic) {
      return undefined;
    }
    return new KtRoadTrafficResponseDto(this._roadTraffic);
  }

  @Expose()
  get locations(): LocationResponseDto | undefined {
    if (!this._location) {
      return undefined;
    }
    return new LocationResponseDto(this._location);
  }
}
