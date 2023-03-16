import { HttpStatus, Injectable } from '@nestjs/common';
import { KtPlace } from '@lib/entity/kt-place/kt-place.entity';
import { SktPlace } from '@lib/entity/skt-place/skt-place.entity';
import { PlaceType } from '../app/app.constant';
import ERROR_CODE from '../app/exceptions/error-code';
import { ClientRequestException } from '../app/exceptions/request.exception';
import { KtPlaceService } from '../kt-place/kt-place.service';
import { SktPlaceService } from '../skt-place/skt-place.service';
import { UserEntity } from '../user/entity/user.entity';
import { PinPlaceRepository } from './pin-place.repository';
import { PinPlace } from '@lib/entity/pin-place/pin-place.entity';
import { PinPlaceBodyDto } from './pin-place.dto';
import { ExtraPlaceService } from '../extra-place/extra-place.service';
import { ExtraPlace } from '@lib/entity/extra-place/extra-place.entity';

@Injectable()
export class PinPlaceService {
  constructor(
    private readonly pinPlaceRepository: PinPlaceRepository,
    private readonly sktPlaceService: SktPlaceService,
    private readonly ktPlaceService: KtPlaceService,
    private readonly extraPlaceService: ExtraPlaceService,
  ) {}

  private async getPlace(idx: number, type: PlaceType) {
    switch (type) {
      case PlaceType.Kt:
        return await this.ktPlaceService.getKtPlaceByIdx(idx);
      case PlaceType.Skt:
        return await this.sktPlaceService.getSktPlaceByIdx(idx);
      case PlaceType.Extra:
        return await this.extraPlaceService.getPlaceByIdx(idx);
      default:
        throw new ClientRequestException(ERROR_CODE.ERR_0000001, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getPinPlaceByUserAndIdx(user: UserEntity, idx: number): Promise<PinPlace> {
    const [pinPlace] = await this.pinPlaceRepository.getPinPlace({ idx }, ['user']);
    if (!pinPlace) {
      throw new ClientRequestException(ERROR_CODE.ERR_0007002, HttpStatus.BAD_REQUEST);
    }

    if (pinPlace.user.idx !== user.idx) {
      throw new ClientRequestException(ERROR_CODE.ERR_0007001, HttpStatus.FORBIDDEN);
    }

    return pinPlace;
  }

  async addPinPlace(user: UserEntity, body: PinPlaceBodyDto) {
    const place = await this.getPlace(body.idx, body.type);

    if (place instanceof SktPlace) {
      await this.pinPlaceRepository.addPinPlace(
        this.pinPlaceRepository.createInstance({
          user,
          sktPlace: place,
        }),
      );
    } else if (place instanceof KtPlace) {
      await this.pinPlaceRepository.addPinPlace(
        this.pinPlaceRepository.createInstance({
          user,
          ktPlace: place,
        }),
      );
    } else {
      await this.pinPlaceRepository.addPinPlace(
        this.pinPlaceRepository.createInstance({
          user,
          extraPlace: place,
        }),
      );
    }
  }

  async getPinPlacesByUser(user: UserEntity): Promise<PinPlace[]> {
    return await this.pinPlaceRepository.getPinPlaces(user);
  }

  async deletePinPlace(user: UserEntity, body: PinPlaceBodyDto): Promise<void> {
    const place = await this.getPlace(body.idx, body.type);
    if (!place) {
      throw new ClientRequestException(ERROR_CODE.ERR_0002001, HttpStatus.BAD_REQUEST);
    }

    const [pinPlace] = await this.pinPlaceRepository.getPinPlace({
      user: { idx: user.idx },
      sktPlace: { idx: place instanceof SktPlace ? place.idx : undefined },
      ktPlace: { idx: place instanceof KtPlace ? place.idx : undefined },
      extraPlace: { idx: place instanceof ExtraPlace ? place.idx : undefined },
    });
    if (!pinPlace) {
      throw new ClientRequestException(ERROR_CODE.ERR_0007002, HttpStatus.BAD_REQUEST);
    }

    await this.pinPlaceRepository.deletePinPlace(pinPlace);
  }
}
