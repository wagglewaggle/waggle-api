import { KtPlace } from 'waggle-entity/dist/kt-place/kt-place.entity';
import { KtPopulationLevel } from 'waggle-entity/dist/kt-population/kt-population.constant';
import { KtPopulation } from 'waggle-entity/dist/kt-population/kt-population.entity';
import { ILivePopulationStatus } from '../../kt-job/kt-city-data.interface';

export class KtPopulationEntity extends KtPopulation {
  readonly idx: number;
  readonly place: KtPlace;
  readonly level: KtPopulationLevel;
  readonly message: string;
  readonly male: number;
  readonly female: number;
  readonly zeroGen: number;
  readonly teenager: number;
  readonly twenties: number;
  readonly thirties: number;
  readonly forties: number;
  readonly fifties: number;
  readonly sixties: number;
  readonly seventies: number;
  readonly resident: number;
  readonly nonResident: number;
  readonly updatedDate: Date;

  constructor(place: KtPlace, { LIVE_PPLTN_STTS }: ILivePopulationStatus, updatedDate: Date) {
    super();
    this.idx = place.idx;
    this.place = place;
    switch (LIVE_PPLTN_STTS.AREA_CONGEST_LVL) {
      case '여유':
        this.level = KtPopulationLevel.Relaxation;
        break;
      case '보통':
        this.level = KtPopulationLevel.Normal;
        break;
      case '약간 붐빔':
      case '붐빔':
        this.level = KtPopulationLevel.Crowded;
        break;
      case '매우 붐빔':
        this.level = KtPopulationLevel.VeryCrowded;
        break;
      default:
        throw new Error(`Area Congest Level Error : ${LIVE_PPLTN_STTS.AREA_CONGEST_LVL}`);
    }
    this.message = LIVE_PPLTN_STTS.AREA_CONGEST_MSG;
    this.male = LIVE_PPLTN_STTS.MALE_PPLTN_RATE;
    this.female = LIVE_PPLTN_STTS.FEMALE_PPLTN_RATE;
    this.zeroGen = LIVE_PPLTN_STTS.PPLTN_RATE_0;
    this.teenager = LIVE_PPLTN_STTS.PPLTN_RATE_10;
    this.twenties = LIVE_PPLTN_STTS.PPLTN_RATE_20;
    this.thirties = LIVE_PPLTN_STTS.PPLTN_RATE_30;
    this.forties = LIVE_PPLTN_STTS.PPLTN_RATE_40;
    this.fifties = LIVE_PPLTN_STTS.PPLTN_RATE_50;
    this.sixties = LIVE_PPLTN_STTS.PPLTN_RATE_60;
    this.seventies = LIVE_PPLTN_STTS.PPLTN_RATE_70;
    this.resident = LIVE_PPLTN_STTS.RESNT_PPLTN_RATE;
    this.nonResident = LIVE_PPLTN_STTS.NON_RESNT_PPLTN_RATE;
    this.updatedDate = updatedDate; // 이전 데이터에서 변경된 점이 없으면 updatedDate가 갱신되지 않기 때문에 js date로 수정한다
  }
}
