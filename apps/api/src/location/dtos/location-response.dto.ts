import { KtPlace } from 'waggle-entity/dist/kt-place/kt-place.entity';
import { SktPlace } from 'waggle-entity/dist/skt-place/skt-place.entity';
import { Exclude, Expose } from 'class-transformer';
import { Location } from 'waggle-entity/dist/location/location.entity';
import { PlaceResponseDto } from '../../place/dtos/place-response.dto';
import { PlaceEntity } from '../../place/entity/place.entity';
import { ExtraPlace } from 'waggle-entity/dist/extra-place/extra-place.entity';

export class LocationResponseDto {
  @Exclude() private readonly _idx: number;
  @Exclude() private readonly _name: string;
  @Exclude() private readonly _ktPlaces: KtPlace[];
  @Exclude() private readonly _sktPlaces: SktPlace[];
  @Exclude() private readonly _extraPlaces: ExtraPlace[];

  constructor(location: Location) {
    this._idx = location.idx;
    this._name = location.name;
    this._ktPlaces = location.ktPlaces;
    this._sktPlaces = location.sktPlaces;
    this._extraPlaces = location.extraPlaces;
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
  get places(): PlaceResponseDto[] {
    const places = PlaceEntity.getRefinedPlaces(this._ktPlaces, this._sktPlaces, this._extraPlaces);
    return places.map((place) => new PlaceResponseDto(place));
  }
}
