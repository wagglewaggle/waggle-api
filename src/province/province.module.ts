import { Module } from '@nestjs/common';
import { ProvinceService } from './province.service';

@Module({
  providers: [ProvinceService]
})
export class ProvinceModule {}
