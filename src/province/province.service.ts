import { Injectable } from '@nestjs/common';
import { Province } from '../app/entities/province/province.entity';
import { ProvinceRepository } from './province.repository';

@Injectable()
export class ProvinceService {
  constructor(private readonly provinceRepository: ProvinceRepository) {}

  async getAllProvince(): Promise<Province[]> {
    return this.provinceRepository.getProvinces({});
  }
}
