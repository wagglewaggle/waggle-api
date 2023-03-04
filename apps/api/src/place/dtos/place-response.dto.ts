import { Exclude, Expose } from 'class-transformer';
import { Category } from '@lib/entity/category/category.entity';
import { KtPopulation } from '@lib/entity/kt-population/kt-population.entity';
import { SktPopulation } from '@lib/entity/skt-population/skt-population.entity';
import { CategoryResponseDto } from '../../category/dtos/category-response.dto';
import { KtPopulationResponseDto } from '../../kt-place/dtos/kt-population-response.dto';
import { SktPopulationResponseDto } from '../../skt-place/dtos/skt-population-response.dto';
import { PlaceEntity } from '../entity/place.entity';
import { PlaceType } from '../../app/app.constant';

export class PlaceResponseDto {
  @Exclude() private readonly _idx: number;
  @Exclude() private readonly _type: PlaceType;
  @Exclude() private readonly _name: string;
  @Exclude() private readonly _x: number;
  @Exclude() private readonly _y: number;
  @Exclude() private readonly _categories?: Category[];
  @Exclude() private readonly _population?: KtPopulation | SktPopulation;

  constructor(place: PlaceEntity) {
    this._idx = place.idx;
    this._type = place.type;
    this._name = place.name;
    this._x = place.x;
    this._y = place.y;
    this._categories = place.categories;
    this._population = place.population;
  }

  @Expose()
  get idx(): number {
    return this._idx;
  }

  @Expose()
  get type(): PlaceType {
    return this._type;
  }

  @Expose()
  get name(): string {
    return this._name;
  }

  @Expose()
  get x(): number {
    return this._x;
  }

  @Expose()
  get y(): number {
    return this._y;
  }

  @Expose()
  get categories(): CategoryResponseDto[] | undefined {
    if (this._categories) {
      return this._categories.map((category) => new CategoryResponseDto(category));
    }
  }

  @Expose()
  get population(): KtPopulationResponseDto | SktPopulationResponseDto | undefined {
    if (this._population instanceof KtPopulation) {
      return new KtPopulationResponseDto(this._population);
    } else if (this._population instanceof SktPopulation) {
      return new SktPopulationResponseDto(this._population);
    }
  }
}
