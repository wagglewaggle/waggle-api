import { Exclude, Expose } from 'class-transformer';
import { Category } from 'waggle-entity/dist/category/category.entity';
import { SktPopulationResponseDto } from './skt-population-response.dto';
import { CategoryTypeResponseDto } from '../../category/dtos/category-type-response.dto';
import { SktPlace } from 'waggle-entity/dist/skt-place/skt-place.entity';
import { SktPopulation } from 'waggle-entity/dist/skt-population/skt-population.entity';
import { Location } from 'waggle-entity/dist/location/location.entity';
import { LocationResponseDto } from '../../location/dtos/location-response.dto';
import { Cctv } from 'waggle-entity/dist/cctv/cctv.entity';
import { CctvResponseDto } from '../../cctv/dto/cctv-response.dto';

export class SktPlaceResponseDto {
  @Exclude() private readonly _idx: number;
  @Exclude() private readonly _poiId: string;
  @Exclude() private readonly _name: string;
  @Exclude() private readonly _x: number;
  @Exclude() private readonly _y: number;
  @Exclude() private readonly _categories: Category[];
  @Exclude() private readonly _population: SktPopulation;
  @Exclude() private readonly _location: Location | undefined;
  @Exclude() private readonly _cctvs: Cctv[] | undefined;

  constructor(place: SktPlace, location?: Location) {
    this._idx = place.idx;
    this._poiId = place.poiId;
    this._name = place.name;
    this._x = place.x;
    this._y = place.y;
    this._categories = place.categories;
    this._population = place.population;
    this._location = location;
    this._cctvs = place.cctvs;
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
  get categories(): CategoryTypeResponseDto[] | undefined {
    if (!this._categories) {
      return undefined;
    }
    return this._categories.map((category) => new CategoryTypeResponseDto(category.type));
  }

  @Expose()
  get population(): SktPopulationResponseDto | undefined {
    if (!this._population) {
      return undefined;
    }
    return new SktPopulationResponseDto(this._population);
  }

  @Expose()
  get cctvs(): CctvResponseDto[] | undefined {
    if (!this._cctvs) {
      return undefined;
    }
    return this._cctvs.map((cctv) => new CctvResponseDto(cctv));
  }

  @Expose()
  get location(): LocationResponseDto | undefined {
    if (!this._location) {
      return undefined;
    }
    return new LocationResponseDto(this._location);
  }
}
