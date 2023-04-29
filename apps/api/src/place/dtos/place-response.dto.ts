import { Exclude, Expose } from 'class-transformer';
import { Category } from 'waggle-entity/dist/category/category.entity';
import { KtPopulation } from 'waggle-entity/dist/kt-population/kt-population.entity';
import { SktPopulation } from 'waggle-entity/dist/skt-population/skt-population.entity';
import { CategoryResponseDto } from '../../category/dtos/category-response.dto';
import { KtPopulationResponseDto } from '../../kt-place/dtos/kt-population-response.dto';
import { SktPopulationResponseDto } from '../../skt-place/dtos/skt-population-response.dto';
import { PlaceEntity } from '../entity/place.entity';
import { PlaceType } from '../../app/app.constant';
import { Cctv } from 'waggle-entity/dist/cctv/cctv.entity';
import { PinPlace } from 'waggle-entity/dist/pin-place/pin-place.entity';
import { ReviewPost } from 'waggle-entity/dist/review-post/review-post.entity';

export class PlaceResponseDto {
  @Exclude() private readonly _idx: number;
  @Exclude() private readonly _type: PlaceType;
  @Exclude() private readonly _name: string;
  @Exclude() private readonly _address: string;
  @Exclude() private readonly _x: number;
  @Exclude() private readonly _y: number;
  @Exclude() private readonly _categories?: Category[];
  @Exclude() private readonly _population?: KtPopulation | SktPopulation;
  @Exclude() private readonly _pinPlaces?: PinPlace[];
  @Exclude() private readonly _reviewPosts?: ReviewPost[];
  @Exclude() private readonly _cctvs?: Cctv[];

  constructor(place: PlaceEntity) {
    this._idx = place.idx;
    this._type = place.type;
    this._name = place.name;
    this._address = place.address;
    this._x = place.x;
    this._y = place.y;
    this._categories = place.categories;
    this._population = place.population;
    this._pinPlaces = place.pinPlaces;
    this._reviewPosts = place.reviewPosts;
    this._cctvs = place.cctvs;
  }

  @Expose()
  get idx(): number {
    return this._idx;
  }

  @Expose()
  get type(): PlaceType {
    return this._type;
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
  get cctvCount(): number | undefined {
    return this._cctvs ? this._cctvs.length : undefined;
  }

  @Expose()
  get categories(): CategoryResponseDto[] | undefined {
    if (this._categories) {
      return this._categories.map((category) => new CategoryResponseDto(category));
    }
  }

  @Expose()
  get population(): KtPopulationResponseDto | SktPopulationResponseDto | undefined {
    if (this._population instanceof KtPopulation) {
      return new KtPopulationResponseDto(this._population);
    } else if (this._population instanceof SktPopulation) {
      return new SktPopulationResponseDto(this._population);
    }
  }
}
