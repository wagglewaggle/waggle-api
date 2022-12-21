import { Module } from '@nestjs/common';
import { KtPlaceService } from './kt-place.service';
import { KtPlaceController } from './kt-place.controller';
import { KtPlaceRepository } from './kt-place.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KtPlace } from '@lib/entity/kt-place/kt-place.entity';
import { LocationModule } from '../location/location.module';

@Module({
  imports: [TypeOrmModule.forFeature([KtPlace]), LocationModule],
  providers: [KtPlaceService, KtPlaceRepository],
  controllers: [KtPlaceController],
})
export class KtPlaceModule {}
