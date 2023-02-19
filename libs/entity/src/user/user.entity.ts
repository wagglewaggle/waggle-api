import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PinPlace } from '../pin-place/pin-place.entity';
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

  @OneToMany(() => PinPlace, (pinPlace) => pinPlace.user)
  pinPlaces: PinPlace[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
