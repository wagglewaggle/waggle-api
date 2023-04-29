import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KtPlace } from 'waggle-entity/dist/kt-place/kt-place.entity';
import { KtPlaceRepository } from './kt-place.repository';
import { KtPlaceService } from './kt-place.service';

@Module({
  imports: [TypeOrmModule.forFeature([KtPlace])],
  providers: [KtPlaceService, KtPlaceRepository],
  exports: [TypeOrmModule, KtPlaceService],
})
export class KtPlaceModule {}
