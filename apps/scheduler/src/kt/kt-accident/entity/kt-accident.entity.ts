import { KtAccident } from '@lib/entity/kt-accident/kt-accident.entity';
import { KtPlace } from '@lib/entity/kt-place/kt-place.entity';
import { IAccidentControlStatus } from '../../kt-job/kt-city-data.interface';

export class KtAccidentEntity extends KtAccident {
  readonly type: string;
  readonly dtype: string;
  readonly info: string;
  readonly x: number;
  readonly y: number;
  readonly place: KtPlace;

  constructor(place: KtPlace, accident: IAccidentControlStatus) {
    super();
    this.type = accident.ACDNT_TYPE;
    this.dtype = accident.ACDNT_DTYPE;
    this.info = accident.ACDNT_INFO;
    this.x = accident.ACDNT_X;
    this.y = accident.ACDNT_Y;
    this.place = place;
    // console.log(ACDNT_CNTRL_STTS);
    // console.log(this);
  }
}
