import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { UserRoleType } from './user-role.constant';

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn()
  idx: number;

  @OneToOne(() => User, (user) => user.userRole)
  @JoinColumn()
  user: User;

  @Column('enum', { enum: UserRoleType })
  role: UserRoleType;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
