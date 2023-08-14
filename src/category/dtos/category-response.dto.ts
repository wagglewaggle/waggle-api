import { Exclude, Expose } from 'class-transformer';
import { CategoryType } from 'waggle-entity/dist/category/category.constant';
import { Category } from 'waggle-entity/dist/category/category.entity';

export class CategoryResponseDto {
  @Exclude() private readonly _idx;
  @Exclude() private readonly _type;

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
