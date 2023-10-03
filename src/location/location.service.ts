import { HttpStatus, Injectable } from '@nestjs/common';
import { Location } from 'waggle-entity/dist/location/location.entity';
import { LocationRepository } from './location.repository';
import { ClientRequestException } from '../app/exceptions/request.exception';
import ERROR_CODE from '../app/exceptions/error-code';
import { SktPlace } from 'waggle-entity/dist/skt-place/skt-place.entity';
import { KtPlace } from 'waggle-entity/dist/kt-place/kt-place.entity';

@Injectable()
export class LocationService {
  constructor(private readonly locationRepository: LocationRepository) {}

  async getLocationAll(): Promise<[Location[], number]> {
    return await this.locationRepository.getLocationAll();
  }

  async getLocationByName(name: string, duplicatePlace?: KtPlace | SktPlace): Promise<Location> {
    const location = await this.locationRepository.getNearByLocation(name, duplicatePlace);
    if (!location) {
      throw new ClientRequestException(ERROR_CODE.ERR_0004001, HttpStatus.BAD_REQUEST);
    }

    return location;
  }
}
