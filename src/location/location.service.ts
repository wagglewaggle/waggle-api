import { HttpStatus, Injectable } from '@nestjs/common';
import { Location } from 'waggle-entity/dist/location/location.entity';
import { LocationRepository } from './location.repository';
import { ClientRequestException } from '../app/exceptions/request.exception';
import ERROR_CODE from '../app/exceptions/error-code';

@Injectable()
export class LocationService {
  constructor(private readonly locationRepository: LocationRepository) {}

  async getLocationAll(): Promise<[Location[], number]> {
    return await this.locationRepository.getLocationAll();
  }

  async getLocationByName(name: string): Promise<Location> {
    const location = await this.locationRepository.getLocation({ name }, [
      'ktPlaces',
      'ktPlaces.population',
      'ktPlaces.categories',
      'sktPlaces',
      'sktPlaces.population',
      'sktPlaces.categories',
    ]);
    if (!location) {
      throw new ClientRequestException(ERROR_CODE.ERR_0004001, HttpStatus.BAD_REQUEST);
    }

    return location;
  }
}
