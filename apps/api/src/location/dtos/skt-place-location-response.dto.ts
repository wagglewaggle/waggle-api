import { Exclude, Expose } from 'class-transformer';
import { Category } from '@lib/entity/category/category.entity';
import { CategoryResponseDto } from '../../category/dtos/category-response.dto';
import { SktPopulation } from '@lib/entity/skt-population/skt-population.entity';
import { SktPlace } from '@lib/entity/skt-place/skt-place.entity';
import { SktPopulationResponseDto } from '../../skt-place/dtos/skt-population-response.dto';

export class SktPlaceLocationResponseDto {
  @Exclude() private readonly _idx: number;
  @Exclude() private readonly _name: string;
  @Exclude() private readonly _categories: Category[];
  @Exclude() private readonly _populations: SktPopulation[];

  constructor(place: SktPlace) {
    this._idx = place.idx;
    this._name = place.name;
    this._categories = place.categories;
    this._populations = place.populations;
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
  get categories(): CategoryResponseDto[] {
    return this._categories.map((category) => new CategoryResponseDto(category));
  }

  @Expose()
  get populations(): SktPopulationResponseDto[] {
    return this._populations.map((population) => new SktPopulationResponseDto(population));
  }
}
