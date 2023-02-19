import { HttpStatus, Injectable } from '@nestjs/common';
import { KtPlace } from '@lib/entity/kt-place/kt-place.entity';
import { SktPlace } from '@lib/entity/skt-place/skt-place.entity';
import { PlaceType } from '../app/app.constant';
import ERROR_CODE from '../app/exceptions/error-code';
import { ClientRequestException } from '../app/exceptions/request.exception';
import { KtPlaceService } from '../kt-place/kt-place.service';
import { SktPlaceService } from '../skt-place/skt-place.service';
import { UserEntity } from '../user/entity/user.entity';
import { AddPinPlaceBodyDto } from './pin-place.dto';
import { PinPlaceRepository } from './pin-place.repository';
import { PinPlace } from '@lib/entity/pin-place/pin-place.entity';

@Injectable()
export class PinPlaceService {
  constructor(
    private readonly pinPlaceRepository: PinPlaceRepository,
    private readonly sktPlaceService: SktPlaceService,
    private readonly ktPlaceService: KtPlaceService,
  ) {}

  private async getPlace(idx: number, type: PlaceType) {
    switch (type) {
      case PlaceType.Kt:
        return await this.ktPlaceService.getKtPlaceByIdx(idx);
      case PlaceType.Skt:
        return await this.sktPlaceService.getSktPlaceByIdx(idx);
      default:
        throw new ClientRequestException(ERROR_CODE.ERR_0000001, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async addPinPlace(user: UserEntity, body: AddPinPlaceBodyDto) {
    const place = await this.getPlace(body.idx, body.type);
    if (!place) {
      throw new ClientRequestException(ERROR_CODE.ERR_0002001, HttpStatus.BAD_REQUEST);
    }

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
    }
  }

  async getPinPlacesByUser(user: UserEntity): Promise<PinPlace[]> {
    return await this.pinPlaceRepository.getPinPlaces(user);
  }
}
