import { Controller, Get, Param } from '@nestjs/common';
import { Province } from '../app/entities/province/province.entity';
import { GetProvinceIdxDto } from './province.dto';
import { ProvinceService } from './province.service';

@Controller('province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Get()
  async getAllProvinces(): Promise<Province[]> {
    return await this.provinceService.getAllProvince();
  }

  @Get(':idx')
  async getProvince(@Param() param: GetProvinceIdxDto) {
    return await this.provinceService.getProvince(param.idx);
  }
}
