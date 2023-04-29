import { Exclude, Expose } from 'class-transformer';
import { PinPlace } from 'waggle-entity/dist/pin-place/pin-place.entity';
import { PlaceResponseDto } from '../../place/dtos/place-response.dto';
import { PlaceEntity } from '../../place/entity/place.entity';

export class PinPlaceResponseDto {
  @Exclude() private readonly _pinPlaces: PinPlace[];

  constructor(pinPlaces: PinPlace[]) {
    this._pinPlaces = pinPlaces;
  }

  @Expose()
  get places() {
    return this._pinPlaces.map(({ idx, sktPlace, ktPlace, extraPlace, createdDate }) => {
      const place = new PlaceEntity(sktPlace || ktPlace || extraPlace);
      return {
        idx,
        place: new PlaceResponseDto(place),
        createdDate,
      };
    });
  }
}
