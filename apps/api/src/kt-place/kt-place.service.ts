import { HttpStatus, Injectable } from '@nestjs/common';
import { KtPlace } from '@lib/entity/kt-place/kt-place.entity';
import ERROR_CODE from '../app/exceptions/error-code';
import { ClientRequestException } from '../app/exceptions/request.exception';
import { KtPlaceRepository } from './kt-place.repository';
import { LocationService } from '../location/location.service';
import { PlaceListFilterQueryDto } from '../place/place.dto';

@Injectable()
export class KtPlaceService {
  constructor(private readonly ktPlaceRepository: KtPlaceRepository, private readonly locationService: LocationService) {}

  async getKtPlaces(query: PlaceListFilterQueryDto): Promise<[KtPlace[], number]> {
    return await this.ktPlaceRepository.getKtPlaces(query);
  }

  async getKtPlaceByIdx(idx: number, relation?: string[]): Promise<KtPlace> {
    const [place] = await this.ktPlaceRepository.getKtPlace({ idx }, relation);
    if (!place) {
      throw new ClientRequestException(ERROR_CODE.ERR_0002001, HttpStatus.BAD_REQUEST);
    }

    return place;
  }

  async getKtPlaceAllInfo(idx: number): Promise<KtPlace> {
    const place = await this.getKtPlaceByIdx(idx, [
      'population',
      'accidents',
      'cctvs',
      'ktRoadTraffic',
      'pinPlaces',
      'reviewPosts',
      'location',
      'location.ktPlaces',
      'location.ktPlaces.population',
      'location.ktPlaces.categories',
      'location.ktPlaces.cctvs',
      'location.ktPlaces.pinPlaces',
      'location.ktPlaces.reviewPosts',
      'location.sktPlaces',
      'location.sktPlaces.population',
      'location.sktPlaces.categories',
      'location.sktPlaces.pinPlaces',
      'location.sktPlaces.reviewPosts',
    ]);
    if (!place) {
      throw new ClientRequestException(ERROR_CODE.ERR_0002001, HttpStatus.BAD_REQUEST);
    }
    return place;
  }
}
