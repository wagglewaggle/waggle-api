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

  constructor(place: KtPlace, { ACDNT_CNTRL_STTS }: IAccidentControlStatus) {
    super();
    this.type = ACDNT_CNTRL_STTS.ACDNT_TYPE;
    this.dtype = ACDNT_CNTRL_STTS.ACDNT_DTYPE;
    this.info = ACDNT_CNTRL_STTS.ACDNT_INFO;
    this.x = ACDNT_CNTRL_STTS.ACDNT_X;
    this.y = ACDNT_CNTRL_STTS.ACDNT_Y;
    this.place = place;
  }
}
