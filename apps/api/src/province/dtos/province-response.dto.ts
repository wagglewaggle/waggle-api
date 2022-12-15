import { Exclude, Expose } from 'class-transformer';
import { KtPlace } from '@lib/entity/kt-place/kt-place.entity';
import { SktPlace } from '@lib/entity/skt-place/skt-place.entity';
import { Province } from '../../../../../libs/entity/src/province/province.entity';

export class ProvinceResponseDto {
  @Exclude() private readonly _idx: number;
  @Exclude() private readonly _name: string;
  @Exclude() private readonly _ktPlace: KtPlace[];
  @Exclude() private readonly _sktPlace: SktPlace[];

  constructor(province: Province) {
    this._idx = province.idx;
    this._name = province.name;
    this._ktPlace = province.ktPlaces;
    this._sktPlace = province.sktPlaces;
  }

  @Expose()
  get idx(): number {
    return this._idx;
  }

  @Expose()
  get name(): string {
    return this._name;
  }

  // @Expose()
  // get ktPlace():
}
