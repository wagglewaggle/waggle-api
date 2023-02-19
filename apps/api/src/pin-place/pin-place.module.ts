import { Module } from '@nestjs/common';
import { PinPlaceService } from './pin-place.service';
import { PinPlaceController } from './pin-place.controller';
import { PinPlaceRepository } from './pin-place.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PinPlace } from '@lib/entity/pin-place/pin-place.entity';
import { SktPlaceModule } from '../skt-place/skt-place.module';
import { KtPlaceModule } from '../kt-place/kt-place.module';

const typeOrmModule = TypeOrmModule.forFeature([PinPlace]);

@Module({
  imports: [typeOrmModule, SktPlaceModule, KtPlaceModule],
  providers: [PinPlaceService, PinPlaceRepository],
  controllers: [PinPlaceController],
  exports: [typeOrmModule, PinPlaceService],
})
export class PinPlaceModule {}
