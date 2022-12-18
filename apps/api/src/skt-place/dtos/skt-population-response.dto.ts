import { Exclude, Expose } from 'class-transformer';
import { SktPopulationLevel } from '@lib/entity/skt-population/skt-population.constant';
import { SktPopulation } from '@lib/entity/skt-population/skt-population.entity';

export class SktPopulationResponseDto {
  @Exclude() private readonly _idx: number;
  @Exclude() private readonly _level: SktPopulationLevel;
  @Exclude() private readonly _createdDate: Date;
  @Exclude() private readonly _updatedDate: Date;

  constructor(population: SktPopulation) {
    this._idx = population.idx;
    this._level = population.level;
    this._createdDate = population.createdDate;
    this._updatedDate = population.updatedDate;
  }

  @Expose()
  get idx(): number {
    return this._idx;
  }

  @Expose()
  get level(): SktPopulationLevel {
    return this._level;
  }

  @Expose()
  get createdDate(): Date {
    return this._createdDate;
  }

  @Expose()
  get updatedDate(): Date {
    return this._updatedDate;
  }
}
