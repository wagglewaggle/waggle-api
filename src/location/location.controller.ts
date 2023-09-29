import { Controller, Get, Param } from '@nestjs/common';
import { Location } from 'waggle-entity/dist/location/location.entity';
import { GetLocationNameParamDto } from './location.dto';
import { LocationService } from './location.service';
import { ApiPath } from './location.constant';

@Controller(ApiPath.Root)
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  async getLocationAll(): Promise<[Location[], number]> {
    const [location, count] = await this.locationService.getLocationAll();
    return [location, count];
  }

  @Get(ApiPath.GetLocationName)
  async getNearByLocation(@Param() param: GetLocationNameParamDto) {
    return this.locationService.getLocationByName(param.name);
  }
}
