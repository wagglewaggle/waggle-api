import { Province } from "@lib/entity/province/province.entity";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

@Injectable()
export class CityDataRepository extends Repository<Province> {
  async getProvinces(): Promise<Province[]> {
    return this.find();
  }
}
