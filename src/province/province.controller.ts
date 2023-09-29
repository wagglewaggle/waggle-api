import { Controller, Get, Param } from '@nestjs/common';
import { Province } from 'waggle-entity/dist/province/province.entity';
import { GetProvinceIdxDto } from './province.dto';
import { ProvinceService } from './province.service';
import { ApiPath } from './province.constant';

@Controller(ApiPath.Root)
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Get()
  async getAllProvinces(): Promise<Province[]> {
    return await this.provinceService.getAllProvince();
  }

  @Get(ApiPath.GetProvinceIdx)
  async getProvince(@Param() param: GetProvinceIdxDto) {
    return await this.provinceService.getProvince(param.idx);
  }
}
