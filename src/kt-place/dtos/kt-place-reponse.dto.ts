import { Exclude, Expose } from 'class-transformer';
import { Cctv } from 'waggle-entity/dist/cctv/cctv.entity';
import { KtAccident } from 'waggle-entity/dist/kt-accident/kt-accident.entity';
import { KtPopulation } from 'waggle-entity/dist/kt-population/kt-population.entity';
import { KtPlace } from 'waggle-entity/dist/kt-place/kt-place.entity';
import { KtPopulationResponseDto } from './kt-population-response.dto';
import { KtAccidentResponseDto } from './kt-accident-response.dto';
import { Category } from 'waggle-entity/dist/category/category.entity';
import { CategoryTypeResponseDto } from '../../category/dtos/category-type-response.dto';
import { CctvResponseDto } from '../../cctv/dto/cctv-response.dto';
import { KtRoadTraffic } from 'waggle-entity/dist/kt-road-traffic/kt-road-traffic.entity';
import { KtRoadTrafficResponseDto } from './kt-road-traffic-response.dto';
import { Location } from 'waggle-entity/dist/location/location.entity';
import { LocationResponseDto } from '../../location/dtos/location-response.dto';

export class KtPlaceResponseDto {
  @Exclude() private readonly _idx: number;
  @Exclude() private readonly _name: string;
  @Exclude() private readonly _x: number;
  @Exclude() private readonly _y: number;
  @Exclude() private readonly _categories: Category[] | undefined;
  @Exclude() private readonly _population: KtPopulation | undefined;
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
    this._population = place.population;
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
  get categories(): CategoryTypeResponseDto[] | undefined {
    if (!this._categories) {
      return undefined;
    }
    return this._categories.map((category) => new CategoryTypeResponseDto(category.type));
  }

  @Expose()
  get population(): KtPopulationResponseDto | undefined {
    if (!this._population) {
      return undefined;
    }
    return new KtPopulationResponseDto(this._population);
  }

  @Expose()
  get accidents(): KtAccidentResponseDto[] | undefined {
    if (!this._accidents) {
      return undefined;
    }
    return this._accidents.map((accident) => new KtAccidentResponseDto(accident));
  }

  @Expose()
  get cctvs(): CctvResponseDto[] | undefined {
    if (!this._cctvs) {
      return undefined;
    }
    return this._cctvs.map((cctv) => new CctvResponseDto(cctv));
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
