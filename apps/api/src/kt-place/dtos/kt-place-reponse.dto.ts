import { Exclude, Expose } from 'class-transformer';
import { Cctv } from '@lib/entity/cctv/cctv.entity';
import { KtAccident } from '@lib/entity/kt-accident/kt-accident.entity';
import { KtPopulation } from '@lib/entity/kt-population/kt-population.entity';
import { KtPlace } from '@lib/entity/kt-place/kt-place.entity';

export class KtPlaceResponseDto {
  @Exclude() private readonly _idx: number;
  @Exclude() private readonly _name: string;
  @Exclude() private readonly _x: number;
  @Exclude() private readonly _y: number;
  @Exclude() private readonly _populations: KtPopulation[];
  @Exclude() private readonly _accidents: KtAccident[];
  @Exclude() private readonly _cctvs: Cctv[];

  constructor(place: KtPlace) {
    this._idx = place.idx;
    this._name = place.name;
    this._x = place.x;
    this._y = place.y;
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

  // @Expose()
}
