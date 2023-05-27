import { Exclude, Expose } from 'class-transformer';
import { SktPopulationResponseDto } from './skt-population-response.dto';
import { CategoryResponseDto } from '../../category/dtos/category-response.dto';
import { LocationResponseDto } from '../../location/dtos/location-response.dto';
import { Category } from 'waggle-entity/dist/category/category.entity';
import { ReviewPost } from 'waggle-entity/dist/review-post/review-post.entity';
import { SktPopulation } from 'waggle-entity/dist/skt-population/skt-population.entity';
import { PinPlace } from 'waggle-entity/dist/pin-place/pin-place.entity';
import { SktPlace } from 'waggle-entity/dist/skt-place/skt-place.entity';
import { Location } from 'waggle-entity/dist/location/location.entity';

export class SktPlaceResponseDto {
  @Exclude() private readonly _idx: number;
  @Exclude() private readonly _poiId: string;
  @Exclude() private readonly _name: string;
  @Exclude() private readonly _address: string;
  @Exclude() private readonly _x: number;
  @Exclude() private readonly _y: number;
  @Exclude() private readonly _categories?: Category[];
  @Exclude() private readonly _population: SktPopulation;
  @Exclude() private readonly _location?: Location;
  @Exclude() private readonly _reviewPosts?: ReviewPost[];
  @Exclude() private readonly _pinPlaces?: PinPlace[];

  constructor(place: SktPlace) {
    this._idx = place.idx;
    this._poiId = place.poiId;
    this._name = place.name;
    this._address = place.address;
    this._x = place.x;
    this._y = place.y;
    this._categories = place.categories;
    this._population = place.population;
    this._location = place.location;
    this._reviewPosts = place.reviewPosts;
    this._pinPlaces = place.pinPlaces;
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
  get categories(): CategoryResponseDto[] | undefined {
    if (!this._categories) {
      return undefined;
    }
    return this._categories.map((category) => new CategoryResponseDto(category));
  }

  @Expose()
  get population(): SktPopulationResponseDto {
    return new SktPopulationResponseDto(this._population);
  }

  @Expose()
  get location(): LocationResponseDto | undefined {
    if (!this._location) {
      return undefined;
    }
    return new LocationResponseDto(this._location);
  }
}
