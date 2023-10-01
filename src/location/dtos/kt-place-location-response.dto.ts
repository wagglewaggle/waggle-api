import { Exclude, Expose } from 'class-transformer';
import { Category } from 'waggle-entity/dist/category/category.entity';
import { KtPlace } from 'waggle-entity/dist/kt-place/kt-place.entity';
import { KtPopulation } from 'waggle-entity/dist/kt-population/kt-population.entity';
import { CategoryTypeResponseDto } from '../../category/dtos/category-type-response.dto';
import { KtPopulationResponseDto } from '../../kt-place/dtos/kt-population-response.dto';

export class KtPlaceLocationResponseDto {
  @Exclude() private readonly _idx: number;
  @Exclude() private readonly _name: string;
  @Exclude() private readonly _categories: Category[];
  @Exclude() private readonly _population?: KtPopulation;

  constructor(place: KtPlace) {
    this._idx = place.idx;
    this._name = place.name;
    this._categories = place.categories;
    this._population = place?.population;
  }

  @Expose()
  get idx(): number {
    return this._idx;
  }

  @Expose()
  get name(): string {
    return this._name;
  }

  @Expose()
  get categories(): CategoryTypeResponseDto[] {
    return this._categories.map((category) => new CategoryTypeResponseDto(category.type));
  }

  @Expose()
  get population(): KtPopulationResponseDto | null {
    if (this._population) {
      return new KtPopulationResponseDto(this._population);
    }
    return null;
  }
}
