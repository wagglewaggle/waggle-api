import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { KtRoadTraffic } from '@lib/entity/kt-road-traffic/kt-road-traffic.entity';

@Injectable()
export class KtRoadTrafficRepository {
  constructor(@InjectRepository(KtRoadTraffic) private readonly repository: Repository<KtRoadTraffic>) {}

  async addKtRoadTraffic(roadTraffic: KtRoadTraffic, manager?: EntityManager): Promise<KtRoadTraffic> {
    if (manager) {
      return await manager.save(KtRoadTraffic, roadTraffic);
    }
    return await this.repository.save(roadTraffic);
  }
}
