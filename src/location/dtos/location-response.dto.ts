import { KtPlace } from 'waggle-entity/dist/kt-place/kt-place.entity';
import { SktPlace } from 'waggle-entity/dist/skt-place/skt-place.entity';
import { Exclude, Expose } from 'class-transformer';
import { Location } from 'waggle-entity/dist/location/location.entity';
import { KtPlaceLocationResponseDto } from './kt-place-location-response.dto';
import { SktPlaceLocationResponseDto } from './skt-place-location-response.dto';

export class LocationResponseDto {
  @Exclude() private readonly _idx: number;
  @Exclude() private readonly _name: string;
  @Exclude() private readonly _ktPlaces: KtPlace[];
  @Exclude() private readonly _sktPlaces: SktPlace[];

  constructor(location: Location) {
    this._idx = location.idx;
    this._name = location.name;
    this._ktPlaces = location.ktPlaces;
    this._sktPlaces = location.sktPlaces;
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
  get ktPlaces(): KtPlaceLocationResponseDto[] {
    return this._ktPlaces.map((place) => new KtPlaceLocationResponseDto(place));
  }

  @Expose()
  get sktPlaces(): SktPlaceLocationResponseDto[] {
    return this._sktPlaces.map((place) => new SktPlaceLocationResponseDto(place));
  }
}
