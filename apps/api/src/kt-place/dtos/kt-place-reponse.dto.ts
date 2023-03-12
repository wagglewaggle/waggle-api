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
import { PinPlace } from '@lib/entity/pin-place/pin-place.entity';
import { ReviewPost } from '@lib/entity/review-post/review-post.entity';

export class KtPlaceResponseDto {
  @Exclude() private readonly _idx: number;
  @Exclude() private readonly _name: string;
  @Exclude() private readonly _address: string;
  @Exclude() private readonly _x: number;
  @Exclude() private readonly _y: number;
  @Exclude() private readonly _categories?: Category[];
  @Exclude() private readonly _population?: KtPopulation;
  @Exclude() private readonly _accidents?: KtAccident[];
  @Exclude() private readonly _cctvs?: Cctv[];
  @Exclude() private readonly _roadTraffic?: KtRoadTraffic;
  @Exclude() private readonly _location?: Location;
  @Exclude() private readonly _reviewPosts?: ReviewPost[];
  @Exclude() private readonly _pinPlaces?: PinPlace[];

  constructor(place: KtPlace) {
    this._idx = place.idx;
    this._name = place.name;
    this._address = place.address;
    this._x = place.x;
    this._y = place.y;
    this._categories = place.categories;
    this._population = place.population;
    this._accidents = place.accidents;
    this._cctvs = place.cctvs;
    this._roadTraffic = place.ktRoadTraffic;
    this._location = place.location;
    this._reviewPosts = place.reviewPosts;
    this._pinPlaces = place.pinPlaces;
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
  get address(): string {
    return this._address;
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
  get reviewPostCount(): number {
    return this._reviewPosts ? this._reviewPosts.length : 0;
  }

  @Expose()
  get pinPlaceCount(): number {
    return this._pinPlaces ? this._pinPlaces.length : 0;
  }

  @Expose()
  get cctvCount(): number {
    return this._cctvs ? this._cctvs.length : 0;
  }

  @Expose()
  get categories(): CategoryResponseDto[] | undefined {
    if (!this._categories) {
      return undefined;
    }
    return this._categories.map((category) => new CategoryResponseDto(category));
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
