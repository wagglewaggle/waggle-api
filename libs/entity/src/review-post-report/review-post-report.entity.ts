import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ReviewPost } from '../review-post/review-post.entity';
import { User } from '../user/user.entity';

@Entity()
export class ReviewPostReport {
  @PrimaryGeneratedColumn()
  idx: number;

  @ManyToOne(() => ReviewPost, (reviewPost) => reviewPost.reports)
  reviewPost: ReviewPost;

  @ManyToOne(() => User, (user) => user.reviewPostReports)
  user: User;
}
