import { HttpStatus, Injectable } from '@nestjs/common';
import { Location } from '@lib/entity/location/location.entity';
import { SktPlace } from '@lib/entity/skt-place/skt-place.entity';
import ERROR_CODE from '../app/exceptions/error-code';
import { ClientRequestException } from '../app/exceptions/request.exception';
import { LocationService } from '../location/location.service';
import { SktPlaceListFilterQueryDto } from './skt-place.dto';
import { SktPlaceRepository } from './skt-place.repository';
import { PlaceListFilterQueryDto } from '../place/place.dto';

@Injectable()
export class SktPlaceService {
  constructor(private readonly sktPlaceRepository: SktPlaceRepository, private readonly locationService: LocationService) {}

  async getSktPlaces(query: PlaceListFilterQueryDto): Promise<[SktPlace[], number]> {
    return await this.sktPlaceRepository.getSktPlaces(query);
  }

  async getSktPlaceByIdx(idx: number, relation?: string[]): Promise<SktPlace> {
    const [place] = await this.sktPlaceRepository.getSktPlace({ idx }, relation);
    if (!place) {
      throw new ClientRequestException(ERROR_CODE.ERR_0002001, HttpStatus.BAD_REQUEST);
    }

    return place;
  }

  async getSktPlaceAllInfo(idx: number): Promise<SktPlace | [SktPlace, Location]> {
    const place = await this.getSktPlaceByIdx(idx, ['population', 'location']);
    if (!place.location) {
      return place;
    }
    const location = await this.locationService.getLocationByName(place.location.name);
    return [place, location];
  }
}
