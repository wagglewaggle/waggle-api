import { Exclude, Expose } from 'class-transformer';
import { SktPlaceResponseDto } from '../../skt-place/dtos/skt-place-response.dto';
import { KtPlaceResponseDto } from '../../kt-place/dtos/kt-place-reponse.dto';
import { PinPlace } from '@lib/entity/pin-place/pin-place.entity';

export class PinPlaceResponseDto {
  @Exclude() private readonly _sktPlaces: PinPlace[];
  @Exclude() private readonly _ktPlaces: PinPlace[];

  constructor(sktPlaces: PinPlace[], ktPlaces: PinPlace[]) {
    this._sktPlaces = sktPlaces;
    this._ktPlaces = ktPlaces;
  }

  @Expose()
  get sktPlaces(): ISktPinPlaceResponse[] {
    return this._sktPlaces.map(({ idx, sktPlace, createdDate }) => {
      return {
        idx,
        place: new SktPlaceResponseDto(sktPlace),
        createdDate,
      };
    });
  }

  @Expose()
  get ktPlaces(): IKtPinPlaceResponse[] {
    return this._ktPlaces.map(({ idx, ktPlace, createdDate }) => {
      return {
        idx,
        place: new KtPlaceResponseDto(ktPlace),
        createdDate,
      };
    });
  }
}

export interface IPinPlaceResponse {
  idx: number;
  createdDate: Date;
}

export interface ISktPinPlaceResponse extends IPinPlaceResponse {
  place: SktPlaceResponseDto;
}

export interface IKtPinPlaceResponse extends IPinPlaceResponse {
  place: KtPlaceResponseDto;
}
