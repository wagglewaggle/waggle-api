import { Controller, Get } from '@nestjs/common';
import { ApiPath } from './city-data.constant';
import { CityDataService } from './city-data.service';

@Controller(ApiPath.Root)
export class CityDataController {
  constructor(private readonly cityDataService: CityDataService) {}

  @Get(ApiPath.Province)
  async getAllProvince() {
    return this.cityDataService.getAllProvinces();
  }
}
