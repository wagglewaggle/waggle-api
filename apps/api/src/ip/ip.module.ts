import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ip } from '@lib/entity/ip/ip.entity';
import { IpRepository } from './ip.repository';
import { IpService } from './ip.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ip])],
  providers: [IpService, IpRepository],
  exports: [TypeOrmModule, IpService],
})
export class IpModule {}
