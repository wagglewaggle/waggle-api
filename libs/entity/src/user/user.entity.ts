import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserRole } from '../user-role/user-role.entity';
import { SnsType, UserStatus } from './user.constant';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column('varchar', { unique: true })
  snsId: string;

  @Column('enum', { enum: SnsType })
  snsType: SnsType;

  @Column('varchar')
  email: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  nickname: string;

  @Column('enum', { enum: UserStatus })
  status: UserStatus;

  @OneToOne(() => UserRole, (userRole) => userRole.user)
  userRole: UserRole;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
