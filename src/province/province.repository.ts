import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Province } from "../entities/province/province.entity";
import { FindManyOptions, FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class ProvinceRepository {
  constructor(@InjectRepository(Province) private readonly repository: Repository<Province>) {}

  async getProvinces(where: FindOptionsWhere<Province>, relations?: string[]): Promise<Province[]> {
    const options: FindManyOptions = { where };
    if (relations) {
      options.relations = relations;
    }
    return this.repository.find(options);
  }
}