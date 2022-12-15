import { Injectable } from '@nestjs/common';
import { Province } from '@lib/entity/province/province.entity';
import { ProvinceRepository } from './province.repository';

@Injectable()
export class ProvinceService {
  constructor(private readonly provinceRepository: ProvinceRepository) {}

  async getAllProvince(): Promise<Province[]> {
    return this.provinceRepository.getProvinces({});
  }

  async getProvince(idx: number): Promise<Province> {
    const [province] = await this.provinceRepository.getProvinces({ idx });
    return province;
  }
}
