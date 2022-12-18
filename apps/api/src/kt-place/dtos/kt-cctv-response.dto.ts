import { Exclude, Expose } from 'class-transformer';
import { Cctv } from '../../../../../libs/entity/src/cctv/cctv.entity';

export class KtCctvResponseDto {
  @Exclude() private readonly _idx;
  @Exclude() private readonly _src;
  @Exclude() private readonly _cctvname;

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
