import { UserRole } from '@lib/entity/user-role/user-role.entity';
import { UserRoleType } from '@lib/entity/user-role/user-role.constant';
import { User } from '@lib/entity/user/user.entity';

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
