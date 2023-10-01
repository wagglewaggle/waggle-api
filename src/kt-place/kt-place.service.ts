import { HttpStatus, Injectable } from '@nestjs/common';
import { KtPlace } from 'waggle-entity/dist/kt-place/kt-place.entity';
import ERROR_CODE from '../app/exceptions/error-code';
import { ClientRequestException } from '../app/exceptions/request.exception';
import { KtPlaceRepository } from './kt-place.repository';
import { KtPlaceListFilterQueryDto } from './kt-place.dto';
import { LocationService } from '../location/location.service';
import { Location } from 'waggle-entity/dist/location/location.entity';

@Injectable()
export class KtPlaceService {
  constructor(private readonly ktPlaceRepository: KtPlaceRepository, private readonly locationService: LocationService) {}

  async getActivatedKtPlaces(query: KtPlaceListFilterQueryDto): Promise<[KtPlace[], number]> {
    return await this.ktPlaceRepository.getActivatedKtPlaces(query);
  }

  async getKtPlaceByIdx(idx: number, relation?: string[]): Promise<KtPlace> {
    const [place] = await this.ktPlaceRepository.getKtPlace({ idx }, relation);
    if (!place) {
      throw new ClientRequestException(ERROR_CODE.ERR_0002001, HttpStatus.BAD_REQUEST);
    }

    return place;
  }

  async getKtPlaceAllInfo(idx: number): Promise<KtPlace | [KtPlace, Location]> {
    const place = await this.getKtPlaceByIdx(idx, ['population', 'accidents', 'cctvs', 'ktRoadTraffic', 'location']);
    if (!place.location) {
      return place;
    }
    const location = await this.locationService.getLocationByName(place.location.name);
    return [place, location];
  }
}
