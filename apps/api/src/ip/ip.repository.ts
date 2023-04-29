import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, FindOptionsWhere, Repository } from 'typeorm';
import { Ip } from 'waggle-entity/dist/ip/ip.entity';

@Injectable()
export class IpRepository {
  constructor(@InjectRepository(Ip) private readonly repository: Repository<Ip>) {}

  async getIp(where: FindOptionsWhere<Ip>, relations?: EntityManager) {
    const options: any = { where };
    if (Array.isArray(relations)) {
      options.relations = relations;
    }
    return await this.repository.findOne(options);
  }
}
