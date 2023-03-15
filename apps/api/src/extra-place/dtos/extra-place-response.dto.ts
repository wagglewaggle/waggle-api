import { Exclude, Expose } from 'class-transformer';
import { Category } from '@lib/entity/category/category.entity';
import { ExtraPlaceStatus } from '@lib/entity/extra-place/extra-place.constant';
import { Location } from '@lib/entity/location/location.entity';
import { PinPlace } from '@lib/entity/pin-place/pin-place.entity';
import { ReviewPost } from '@lib/entity/review-post/review-post.entity';
import { ExtraPlace } from '@lib/entity/extra-place/extra-place.entity';
import { CategoryResponseDto } from '../../category/dtos/category-response.dto';
import { LocationResponseDto } from '../../location/dtos/location-response.dto';

export class ExtraPlaceResponseDto {
  @Exclude() private readonly _idx: number;
  @Exclude() private readonly _name: string;
  @Exclude() private readonly _x: number;
  @Exclude() private readonly _y: number;
  @Exclude() private readonly _address: string;
  @Exclude() private readonly _status: ExtraPlaceStatus;
  @Exclude() private readonly _location?: Location;
  @Exclude() private readonly _pinPlaces?: PinPlace[];
  @Exclude() private readonly _reviewPosts?: ReviewPost[];
  @Exclude() private readonly _categories?: Category[];
  @Exclude() private readonly _createdDate: Date;

  constructor(place: ExtraPlace) {
    this._idx = place.idx;
    this._name = place.name;
    this._x = place.x;
    this._y = place.y;
    this._address = place.address;
    this._status = place.status;
    this._location = place.location;
    this._pinPlaces = place.pinPlaces;
    this._reviewPosts = place.reviewPosts;
    this._categories = place.categories;
    this._createdDate = place.createdDate;
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
  get status(): ExtraPlaceStatus {
    return this._status;
  }

  @Expose()
  get createdDate(): Date {
    return this._createdDate;
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
  get locations(): LocationResponseDto | undefined {
    if (!this._location) {
      return undefined;
    }
    return new LocationResponseDto(this._location);
  }
}
