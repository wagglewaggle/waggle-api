import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Province } from '../app/entities/province/province.entity';
import { ProvinceRepository } from './province.repository';
import { ProvinceService } from './province.service';

@Module({
  imports: [TypeOrmModule.forFeature([Province])],
  providers: [ProvinceService, ProvinceRepository],
  exports: [TypeOrmModule, ProvinceService],
})
export class ProvinceModule {}
