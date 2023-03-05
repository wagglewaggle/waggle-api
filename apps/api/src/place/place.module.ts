import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { SktPlaceModule } from '../skt-place/skt-place.module';
import { KtPlaceModule } from '../kt-place/kt-place.module';

@Module({
  imports: [SktPlaceModule, KtPlaceModule],
  providers: [PlaceService],
  controllers: [PlaceController],
  exports: [PlaceService],
})
export class PlaceModule {}
