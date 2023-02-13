import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
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

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
