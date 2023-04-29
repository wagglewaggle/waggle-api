import { UserRoleType } from 'waggle-entity/dist/user-role/user-role.constant';
import { UserRole } from 'waggle-entity/dist/user-role/user-role.entity';
import { User } from 'waggle-entity/dist/user/user.entity';

export class UserRoleEntity extends UserRole {
  readonly idx: number;
  readonly user: User;
  readonly role: UserRoleType;
  readonly createdDate: Date;
  readonly updatedDate: Date;

  constructor({ user, role }) {
    super();
    this.user = user;
    this.role = role;
  }
}
