import { SktPlace } from '@lib/entity/skt-place/skt-place.entity';
import { SktPopulationLevel } from '@lib/entity/skt-population/skt-population.constant';
import { SktPopulation } from '@lib/entity/skt-population/skt-population.entity';
import { ISktRealTimeCongestion } from '../../skt-job/skt-city-data.interface';

export class SktPopulationEntity extends SktPopulation {
  readonly idx: number;
  readonly place: SktPlace;
  readonly level: SktPopulationLevel;

  constructor(place: SktPlace, rltm: ISktRealTimeCongestion) {
    super();
    this.idx = place.idx;
    this.place = place;
    switch (rltm.congestionLevel) {
      case 0:
      case 1:
      case 2:
        this.level = SktPopulationLevel.VeryRelaxation;
        break;
      case 3:
      case 4:
        this.level = SktPopulationLevel.Relaxation;
        break;
      case 5:
      case 6:
        this.level = SktPopulationLevel.Normal;
        break;
      case 7:
      case 8:
        this.level = SktPopulationLevel.Crowded;
        break;
      case 9:
      case 10:
        this.level = SktPopulationLevel.VeryCrowded;
        break;
      default:
        throw new Error(`Area Congest Level Error : ${rltm.congestionLevel}`);
    }
  }
}
