import { Exclude, Expose } from 'class-transformer';
import { KtPlace } from 'waggle-entity/dist/kt-place/kt-place.entity';
import { KtAccident } from 'waggle-entity/dist/kt-accident/kt-accident.entity';

export class KtAccidentResponseDto {
  @Exclude() private readonly _idx: number;
  @Exclude() private readonly _type: string;
  @Exclude() private readonly _dtype: string;
  @Exclude() private readonly _info: string;
  @Exclude() private readonly _x: number;
  @Exclude() private readonly _y: number;
  @Exclude() private readonly _place: KtPlace;
  @Exclude() private readonly _createdDate: Date;
  @Exclude() private readonly _updatedDate: Date;

  constructor(accident: KtAccident) {
    this._idx = accident.idx;
    this._type = accident.type;
    this._dtype = accident.dtype;
    this._info = accident.info;
    this._x = accident.x;
    this._y = accident.y;
    this._place = accident.place;
    this._createdDate = accident.createdDate;
    this._updatedDate = accident.updatedDate;
  }

  @Expose()
  get idx(): number {
    return this._idx;
  }

  @Expose()
  get type(): string {
    return this._type;
  }

  @Expose()
  get dtype(): string {
    return this._dtype;
  }

  @Expose()
  get info(): string {
    return this._info;
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
  get createdDate(): Date {
    return this._createdDate;
  }

  @Expose()
  get updatedDate(): Date {
    return this._updatedDate;
  }
}
