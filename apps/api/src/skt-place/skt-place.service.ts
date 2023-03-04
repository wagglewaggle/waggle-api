import { HttpStatus, Injectable } from '@nestjs/common';
import { SktPlace } from '@lib/entity/skt-place/skt-place.entity';
import ERROR_CODE from '../app/exceptions/error-code';
import { ClientRequestException } from '../app/exceptions/request.exception';
import { LocationService } from '../location/location.service';
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

  async getSktPlaceAllInfo(idx: number): Promise<SktPlace> {
    const place = await this.getSktPlaceByIdx(idx, [
      'population',
      'location',
      'location.ktPlaces',
      'location.ktPlaces.population',
      'location.ktPlaces.categories',
      'location.sktPlaces',
      'location.sktPlaces.population',
      'location.sktPlaces.categories',
    ]);
    if (!place) {
      throw new ClientRequestException(ERROR_CODE.ERR_0002001, HttpStatus.BAD_REQUEST);
    }
    return place;
  }
}
