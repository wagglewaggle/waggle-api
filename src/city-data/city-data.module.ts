import { Module } from '@nestjs/common';
import { CityDataService } from './city-data.service';
import { CityDataController } from './city-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Province } from '@lib/entity/province/province.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Province])],
  providers: [CityDataService],
  controllers: [CityDataController],
})
export class CityDataModule {}
