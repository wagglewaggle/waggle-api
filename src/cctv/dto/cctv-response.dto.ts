import { Exclude, Expose } from 'class-transformer';
import { Cctv } from 'waggle-entity/dist/cctv/cctv.entity';

export class CctvResponseDto {
  @Exclude() private readonly _idx: number;
  @Exclude() private readonly _src: string;
  @Exclude() private readonly _cctvname: string;

  constructor(cctv: Cctv) {
    this._idx = cctv.idx;
    this._src = cctv.src;
    this._cctvname = cctv.cctvname;
  }

  @Expose()
  get idx(): number {
    return this._idx;
  }

  @Expose()
  get src(): string {
    return this._src;
  }

  @Expose()
  get cctvname(): string {
    return this._cctvname;
  }
}
