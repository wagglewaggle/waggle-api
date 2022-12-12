import { HttpStatus, Injectable } from '@nestjs/common';
import { KtPlace } from '../app/entities/kt-place/kt-place.entity';
import ERROR_CODE from '../app/exceptions/error-code';
import { ClientRequestException } from '../app/exceptions/request.exception';
import { KtPlaceRepository } from './kt-place.repository';

@Injectable()
export class KtPlaceService {
  constructor(private readonly ktPlaceRepository: KtPlaceRepository) {}

  async getKtPlaces(): Promise<KtPlace[]> {
    return await this.ktPlaceRepository.getKtPlace({});
  }

  async getKtPlaceByIdx(idx: number, relation?: string[]): Promise<KtPlace> {
    const [place] = await this.ktPlaceRepository.getKtPlace({ idx }, relation);
    if (!place) {
      throw new ClientRequestException(
        ERROR_CODE.ERR_0002001,
        HttpStatus.BAD_REQUEST,
      );
    }

    return place;
  }

  async getKtPlaceAllInfo(idx: number): Promise<KtPlace> {
    return await this.getKtPlaceByIdx(idx, ['populations', 'accidents']);
  }
}
