import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryType } from 'waggle-entity/dist/category-type/category-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryTypeRepository {
  constructor(@InjectRepository(CategoryType) private readonly repository: Repository<CategoryType>) {}

  async getCategoryTypeList(): Promise<CategoryType[]> {
    return this.repository.find({ order: { idx: 'ASC' } });
  }
}
