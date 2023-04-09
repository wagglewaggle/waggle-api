import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { UserTokenStatus } from './user-token.constant';

@Entity()
export class UserToken {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column('varchar')
  token: string;

  @Column('enum', { enum: UserTokenStatus })
  status: UserTokenStatus;

  @CreateDateColumn()
  createdDate: Date;

  @Column('datetime', { nullable: true })
  expiredDate: Date;

  @ManyToOne(() => User, (user) => user.userTokens)
  user: User;
}
