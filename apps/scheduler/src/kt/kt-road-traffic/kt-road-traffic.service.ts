import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { KtRoadTraffic } from 'waggle-entity/dist/kt-road-traffic/kt-road-traffic.entity';
import { KtRoadTrafficRepository } from './kt-road-traffic.repository';

@Injectable()
export class KtRoadTrafficService {
  constructor(private readonly ktRoadTrafficRepository: KtRoadTrafficRepository) {}

  async addKtRoadTraffic(roadTraffic: KtRoadTraffic, manager?: EntityManager): Promise<KtRoadTraffic> {
    return await this.ktRoadTrafficRepository.addKtRoadTraffic(roadTraffic, manager);
  }
}
