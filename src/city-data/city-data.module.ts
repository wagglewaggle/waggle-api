import { Module } from '@nestjs/common';
import { CityDataService } from './city-data.service';
import { CityDataController } from './city-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvinceModule } from 'src/province/province.module';

@Module({
  imports: [ProvinceModule],
  providers: [CityDataService],
  controllers: [CityDataController],
})
export class CityDataModule {}
