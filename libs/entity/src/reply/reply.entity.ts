import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ReplyReport } from '../reply-report/reply-report.entity';
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
  level: number;

  @Column('int')
  mainReplyIdx: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @OneToMany(() => ReplyReport, (replyReport) => replyReport.reply)
  reports: ReplyReport[];
}
