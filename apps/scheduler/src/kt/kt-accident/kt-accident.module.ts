import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KtAccident } from '@lib/entity/kt-accident/kt-accident.entity';
import { KtAccidentRepository } from './kt-accident.repository';
import { KtAccidentService } from './kt-accident.service';

@Module({
  imports: [TypeOrmModule.forFeature([KtAccident])],
  providers: [KtAccidentService, KtAccidentRepository],
  exports: [TypeOrmModule, KtAccidentService],
})
export class KtAccidentModule {}
