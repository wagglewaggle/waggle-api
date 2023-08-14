import { Module } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { ProvinceController } from './province.controller';
import { ProvinceRepository } from './province.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Province } from 'waggle-entity/dist/province/province.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Province])],
  providers: [ProvinceService, ProvinceRepository],
  controllers: [ProvinceController],
})
export class ProvinceModule {}
