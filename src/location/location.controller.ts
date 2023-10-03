import { Controller, Get, Param } from '@nestjs/common';
import { Location } from 'waggle-entity/dist/location/location.entity';
import { GetLocationNameParamDto } from './location.dto';
import { LocationService } from './location.service';
import { ApiPath } from './location.constant';
import { LocationResponseDto } from './dtos/location-response.dto';

@Controller(ApiPath.Root)
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  async getLocationAll(): Promise<[Location[], number]> {
    const [location, count] = await this.locationService.getLocationAll();
    return [location, count];
  }

  @Get(ApiPath.GetLocationName)
  async getNearByLocation(@Param() param: GetLocationNameParamDto): Promise<LocationResponseDto> {
    const result = await this.locationService.getLocationByName(param.name);
    return new LocationResponseDto(result);
  }
}
