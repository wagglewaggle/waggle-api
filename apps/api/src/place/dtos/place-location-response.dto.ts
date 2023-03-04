import { Exclude, Expose } from 'class-transformer';
import { KtPlace } from '@lib/entity/kt-place/kt-place.entity';
import { SktPlace } from '@lib/entity/skt-place/skt-place.entity';
import { Location } from '@lib/entity/location/location.entity';
import { PlaceResponseDto } from './place-response.dto';
import { PlaceEntity } from '../entity/place.entity';

export class PlaceLocationResponseDto {
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
  get places(): PlaceResponseDto[] {
    const places = PlaceEntity.getRefinedPlaces(this._ktPlaces, this._sktPlaces);
    return places.map((place) => new PlaceResponseDto(place));
  }
}
