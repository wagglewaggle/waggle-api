import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ReviewPost } from '../review-post/review-post.entity';
import { User } from '../user/user.entity';

@Entity()
export class PinReviewPost {
  @PrimaryGeneratedColumn()
  idx: number;

  @ManyToOne(() => User, (user) => user.pinReviewPosts)
  user: User;

  @ManyToOne(() => ReviewPost, (reviewPost) => reviewPost.pinReviewPosts)
  reviewPost: ReviewPost;

  @CreateDateColumn()
  createdDate: Date;
}
