import { Column, CreateDateColumn, Entity, Index, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PinPlace } from '../pin-place/pin-place.entity';
import { PinReviewPost } from '../pin-review-post/pin-review-post.entity';
import { Reply } from '../reply/reply.entity';
import { ReviewPost } from '../review-post/review-post.entity';
import { UserRole } from '../user-role/user-role.entity';
import { UserToken } from '../user-token/user-token.entity';
import { SnsType, UserStatus } from './user.constant';

@Entity()
@Index(['nickname'])
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

  @OneToMany(() => PinReviewPost, (pinReviewPost) => pinReviewPost.user)
  pinReviewPosts: PinReviewPost[];

  @OneToMany(() => UserToken, (userToken) => userToken.user)
  userTokens: UserToken[];

  @OneToMany(() => ReviewPost, (reviewPost) => reviewPost.user)
  reviewPosts: ReviewPost[];

  @OneToMany(() => Reply, (reply) => reply.user)
  replies: Reply[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
