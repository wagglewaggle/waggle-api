import { Exclude, Expose } from 'class-transformer';
import { CategoryType } from '@lib/entity/category/category.constant';
import { Category } from '@lib/entity/category/category.entity';

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
