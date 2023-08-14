import { Module } from '@nestjs/common';
import { SktPlaceService } from './skt-place.service';
import { SktPlaceController } from './skt-place.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SktPlace } from 'waggle-entity/dist/skt-place/skt-place.entity';
import { SktPlaceRepository } from './skt-place.repository';
import { LocationModule } from '../location/location.module';

@Module({
  imports: [TypeOrmModule.forFeature([SktPlace]), LocationModule],
  providers: [SktPlaceService, SktPlaceRepository],
  controllers: [SktPlaceController],
})
export class SktPlaceModule {}
