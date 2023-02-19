import { Exclude, Expose } from 'class-transformer';
import { KtPlace } from '@lib/entity/kt-place/kt-place.entity';
import { SktPlace } from '@lib/entity/skt-place/skt-place.entity';
import { SktPlaceResponseDto } from '../../skt-place/dtos/skt-place-response.dto';
import { KtPlaceResponseDto } from '../../kt-place/dtos/kt-place-reponse.dto';

export class PinPlaceResponseDto {
  @Exclude() private readonly _sktPlaces: SktPlace[];
  @Exclude() private readonly _ktPlaces: KtPlace[];

  constructor(sktPlaces: SktPlace[], ktPlaces: KtPlace[]) {
    this._sktPlaces = sktPlaces;
    this._ktPlaces = ktPlaces;
  }

  @Expose()
  get sktPlaces(): SktPlaceResponseDto[] {
    return this._sktPlaces.map((place) => new SktPlaceResponseDto(place));
  }

  @Expose()
  get ktPlaces(): KtPlaceResponseDto[] {
    return this._ktPlaces.map((place) => new KtPlaceResponseDto(place));
  }
}
