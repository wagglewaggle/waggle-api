import { Exclude, Expose } from 'class-transformer';
import { Category } from 'waggle-entity/dist/category/category.entity';
import { SktPopulation } from 'waggle-entity/dist/skt-population/skt-population.entity';
import { CategoryTypeResponseDto } from '../../category/dtos/category-type-response.dto';
import { SktPlace } from 'waggle-entity/dist/skt-place/skt-place.entity';
import { SktPopulationResponseDto } from '../../skt-place/dtos/skt-population-response.dto';

export class SktPlaceLocationResponseDto {
  @Exclude() private readonly _idx: number;
  @Exclude() private readonly _name: string;
  @Exclude() private readonly _categories: Category[];
  @Exclude() private readonly _population: SktPopulation;

  constructor(place: SktPlace) {
    this._idx = place.idx;
    this._name = place.name;
    this._categories = place.categories;
    this._population = place.population;
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
  get population(): SktPopulationResponseDto {
    return new SktPopulationResponseDto(this._population);
  }
}
