import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from '@lib/entity/location/location.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class LocationRepository {
  constructor(@InjectRepository(Location) private readonly repository: Repository<Location>) {}

  async getLocationAll(): Promise<[Location[], number]> {
    return this.repository.findAndCount();
  }

  async getLocation(where: FindOptionsWhere<Location>, relation?: string[]): Promise<Location | undefined> {
    const options: any = { where };
    if (Array.isArray(relation)) {
      options.relations = relation;
    }
    const result = await this.repository.findOne(options);
    return result || undefined;
  }
}
