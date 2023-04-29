import { KtPlace } from 'waggle-entity/dist/kt-place/kt-place.entity';
import { KtRoadTraffic } from 'waggle-entity/dist/kt-road-traffic/kt-road-traffic.entity';
import { IRoadTraffic } from '../../kt-job/kt-city-data.interface';

export class KtRoadTrafficEntity extends KtRoadTraffic {
  readonly idx: number;
  readonly info: string;
  readonly type: string;
  readonly avgSpeed: number;
  readonly ktPlace: KtPlace;

  constructor(place: KtPlace, roadTraffic: IRoadTraffic) {
    super();
    this.idx = place.idx;
    this.info = roadTraffic.ROAD_MSG;
    this.type = roadTraffic.ROAD_TRAFFIC_IDX;
    this.avgSpeed = roadTraffic.ROAD_TRAFFIC_SPD;
    this.ktPlace = place;
  }
}
