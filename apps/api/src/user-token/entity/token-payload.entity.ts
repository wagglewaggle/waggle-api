import { SnsType } from 'waggle-entity/dist/user/user.constant';
import { UserEntity } from '../../user/entity/user.entity';

export class TokenPayloadEntity {
  readonly idx: number;
  readonly type: SnsType;
  readonly email: string;
  readonly name: string;

  constructor(user: UserEntity) {
    this.idx = user.idx;
    this.type = user.snsType;
    this.email = user.email;
    this.name = user.name;
  }

  toJson(): Record<string, any> {
    return {
      idx: this.idx,
      type: this.type,
    };
  }
}
