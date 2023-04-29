import { Exclude, Expose } from 'class-transformer';
import { UserRole } from 'waggle-entity/dist/user-role/user-role.entity';
import { SnsType, UserStatus } from 'waggle-entity/dist/user/user.constant';
import { UserEntity } from '../entity/user.entity';

export class UserResponseDto {
  @Exclude() private readonly _idx: number;
  @Exclude() private readonly _snsId: string;
  @Exclude() private readonly _snsType: SnsType;
  @Exclude() private readonly _email: string;
  @Exclude() private readonly _name: string;
  @Exclude() private readonly _nickname: string;
  @Exclude() private readonly _status: UserStatus;
  @Exclude() private readonly _userRole?: UserRole;
  @Exclude() private readonly _createdDate: Date;
  @Exclude() private readonly _updatedDate: Date;

  constructor(userEntity: UserEntity) {
    this._idx = userEntity.idx;
    this._snsId = userEntity.snsId;
    this._snsType = userEntity.snsType;
    this._email = userEntity.email;
    this._name = userEntity.name;
    this._nickname = userEntity.nickname;
    this._status = userEntity.status;
    this._userRole = userEntity.userRole;
    this._createdDate = userEntity.createdDate;
    this._updatedDate = userEntity.updatedDate;
  }

  @Expose()
  get idx(): number {
    return this._idx;
  }

  @Expose()
  get snsId(): string {
    return this._snsId;
  }

  @Expose()
  get snsType(): SnsType {
    return this._snsType;
  }

  @Expose()
  get email(): string {
    return this._email;
  }

  @Expose()
  get name(): string {
    return this._name;
  }

  @Expose()
  get nickname(): string {
    return this._nickname;
  }

  @Expose()
  get status(): UserStatus {
    return this._status;
  }

  @Expose()
  get userRole(): UserRole | undefined {
    if (this._userRole) {
      return this._userRole;
    }
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
