import { Module } from '@nestjs/common';
import { SktPlaceService } from './skt-place.service';
import { SktPlaceController } from './skt-place.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SktPlace } from '@lib/entity/skt-place/skt-place.entity';
import { SktPlaceRepository } from './skt-place.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SktPlace])],
  providers: [SktPlaceService, SktPlaceRepository],
  controllers: [SktPlaceController],
})
export class SktPlaceModule {}
