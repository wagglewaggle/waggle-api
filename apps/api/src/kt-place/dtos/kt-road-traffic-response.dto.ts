import { Exclude, Expose } from 'class-transformer';
import { KtPlace } from '@lib/entity/kt-place/kt-place.entity';
import { KtRoadTraffic } from '@lib/entity/kt-road-traffic/kt-road-traffic.entity';

export class KtRoadTrafficResponseDto {
  @Exclude() private readonly _idx: number;
  @Exclude() private readonly _info: string;
  @Exclude() private readonly _type: string;
  @Exclude() private readonly _avgSpeed: number;
  @Exclude() private readonly _ktPlace: KtPlace;

  constructor(roadTraffic: KtRoadTraffic) {
    this._idx = roadTraffic.idx;
    this._info = roadTraffic.info;
    this._type = roadTraffic.type;
    this._avgSpeed = roadTraffic.avgSpeed;
    this._ktPlace = roadTraffic.ktPlace;
  }

  @Expose()
  get idx(): number {
    return this._idx;
  }

  @Expose()
  get type(): string {
    return this._type;
  }

  @Expose()
  get info(): string {
    return this._info;
  }

  @Expose()
  get avgSpeed(): number {
    return this._avgSpeed;
  }
}
