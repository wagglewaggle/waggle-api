import { Module } from '@nestjs/common';
import { SktPlaceService } from './skt-place.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SktPlaceRepository } from './skt-place.repository';
import { LocationModule } from '../location/location.module';
import { SktPlace } from 'waggle-entity/dist/skt-place/skt-place.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SktPlace]), LocationModule],
  providers: [SktPlaceService, SktPlaceRepository],
  exports: [TypeOrmModule.forFeature([SktPlace]), SktPlaceService],
})
export class SktPlaceModule {}
