import { Controller, Get } from '@nestjs/common';
import { ApiPath } from './category.constant';
import { CategoryService } from './category.service';
import { IListResponse } from '../app/interfaces/common.interface';
import { CategoryTypeService } from '../category-type/category-type.service';
import { CategoryType } from 'waggle-entity/dist/category-type/category-type.entity';

@Controller(ApiPath.Root)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService, private readonly categoryTypeService: CategoryTypeService) {}

  @Get()
  async getCategoryList(): Promise<IListResponse<CategoryType>> {
    const result = await this.categoryTypeService.getCategoryTypeList();
    return { list: result };
  }
}
