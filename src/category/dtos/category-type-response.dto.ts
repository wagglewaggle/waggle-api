import { Exclude, Expose } from 'class-transformer';
import { CategoryType } from 'waggle-entity/dist/category-type/category-type.entity';

export class CategoryTypeResponseDto {
  @Exclude() private readonly _idx: number;
  @Exclude() private readonly _type: string;

  constructor(categoryType: CategoryType) {
    this._idx = categoryType.idx;
    this._type = categoryType.type;
  }

  @Expose()
  get idx(): number {
    return this._idx;
  }

  @Expose()
  get type(): string {
    return this._type;
  }
}
