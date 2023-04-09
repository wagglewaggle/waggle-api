import { KtPlace } from '@lib/entity/kt-place/kt-place.entity';
import { PinPlace } from '@lib/entity/pin-place/pin-place.entity';
import { SktPlace } from '@lib/entity/skt-place/skt-place.entity';
import { User } from '@lib/entity/user/user.entity';

export class PinPlaceEntity extends PinPlace {
  readonly idx: number;
  readonly user: User;
  readonly sktPlace: SktPlace;
  readonly ktPlace: KtPlace;
  readonly createdDate: Date;

  constructor(pinPlace: PinPlace) {
    super();
    this.idx = pinPlace.idx;
    this.user = pinPlace.user;
    this.sktPlace = pinPlace.sktPlace;
    this.ktPlace = pinPlace.ktPlace;
    this.createdDate = pinPlace.createdDate;
  }
}
