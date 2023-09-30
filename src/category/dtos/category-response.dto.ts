import { Exclude, Expose } from 'class-transformer';
import { Category } from 'waggle-entity/dist/category/category.entity';
import { CategoryType } from 'waggle-entity/dist/category-type/category-type.entity';

export class CategoryResponseDto {
  @Exclude() private readonly _idx: number;
  @Exclude() private readonly _type: CategoryType;

  constructor(category: Category) {
    this._idx = category.idx;
    this._type = category.type;
  }

  @Expose()
  get idx(): number {
    return this._idx;
  }

  @Expose()
  get type(): CategoryType {
    return this._type;
  }
}
