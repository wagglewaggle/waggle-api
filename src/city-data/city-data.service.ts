import { Injectable } from '@nestjs/common';
import { Province } from '../entities/province/province.entity';
import { ProvinceService } from 'src/province/province.service';

@Injectable()
export class CityDataService {
  constructor(private readonly provinceService: ProvinceService) {}

  async getAllProvinces(): Promise<Province[]> {
    return this.provinceService.getAllProvince();
  }
}
