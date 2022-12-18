import { Exclude, Expose } from 'class-transformer';
import { KtPopulationLevel } from '@lib/entity/kt-population/kt-population.constant';
import { KtPopulation } from '@lib/entity/kt-population/kt-population.entity';

export class KtPopulationResponseDto {
  @Exclude() private readonly _idx: number;
  @Exclude() private readonly _level: KtPopulationLevel;
  @Exclude() private readonly _message: string;
  @Exclude() private readonly _male: number;
  @Exclude() private readonly _female: number;
  @Exclude() private readonly _zeroGen: number;
  @Exclude() private readonly _teenager: number;
  @Exclude() private readonly _twenties: number;
  @Exclude() private readonly _thirties: number;
  @Exclude() private readonly _forties: number;
  @Exclude() private readonly _fifties: number;
  @Exclude() private readonly _sixties: number;
  @Exclude() private readonly _seventies: number;
  @Exclude() private readonly _resident: number;
  @Exclude() private readonly _nonResident: number;
  @Exclude() private readonly _createdDate: Date;
  @Exclude() private readonly _updatedDate: Date;

  constructor(population: KtPopulation) {
    this._idx = population.idx;
    this._level = population.level;
    this._message = population.message;
    this._male = population.male;
    this._female = population.female;
    this._zeroGen = population.zeroGen;
    this._teenager = population.teenager;
    this._twenties = population.twenties;
    this._thirties = population.thirties;
    this._forties = population.forties;
    this._fifties = population.fifties;
    this._sixties = population.sixties;
    this._seventies = population.seventies;
    this._resident = population.resident;
    this._nonResident = population.nonResident;
    this._createdDate = population.createdDate;
    this._updatedDate = population.updatedDate;
  }

  @Expose()
  get idx(): number {
    return this._idx;
  }

  @Expose()
  get level(): KtPopulationLevel {
    return this._level;
  }

  @Expose()
  get message(): string {
    return this._message;
  }

  @Expose()
  get male(): number {
    return this._male;
  }

  @Expose()
  get female(): number {
    return this._female;
  }

  @Expose()
  get zeroGen(): number {
    return this._zeroGen;
  }

  @Expose()
  get teenage(): number {
    return this._teenager;
  }

  @Expose()
  get twenties(): number {
    return this._twenties;
  }

  @Expose()
  get thirties(): number {
    return this._thirties;
  }

  @Expose()
  get forties(): number {
    return this._forties;
  }

  @Expose()
  get fifties(): number {
    return this._fifties;
  }

  @Expose()
  get sixties(): number {
    return this._sixties;
  }

  @Expose()
  get seventies(): number {
    return this._seventies;
  }

  @Expose()
  get resident(): number {
    return this._resident;
  }

  @Expose()
  get nonResident(): number {
    return this._nonResident;
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
