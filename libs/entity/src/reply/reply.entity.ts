import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ReviewPost } from '../review-post/review-post.entity';
import { User } from '../user/user.entity';
import { ReplyStatus } from './reply.constant';

@Entity()
export class Reply {
  @PrimaryGeneratedColumn()
  idx: number;

  @ManyToOne(() => ReviewPost, (reviewPost) => reviewPost.replies)
  reviewPost: ReviewPost;

  @ManyToOne(() => User, (user) => user.replies)
  user: User;

  @Column('text')
  content: string;

  @Column('enum', { enum: ReplyStatus })
  status: ReplyStatus;

  @Column('int')
  report: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
