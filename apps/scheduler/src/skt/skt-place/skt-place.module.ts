import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SktPlace } from '@lib/entity/skt-place/skt-place.entity';
import { SktPlaceRepository } from './skt-place.repository';
import { SktPlaceService } from './skt-place.service';

@Module({
  imports: [TypeOrmModule.forFeature([SktPlace])],
  providers: [SktPlaceService, SktPlaceRepository],
  exports: [TypeOrmModule, SktPlaceService],
})
export class SktPlaceModule {}
