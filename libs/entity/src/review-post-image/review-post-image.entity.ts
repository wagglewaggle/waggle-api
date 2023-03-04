import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ReviewPost } from '../review-post/review-post.entity';

@Entity()
export class ReviewPostImage {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column('varchar')
  url: string;

  @CreateDateColumn()
  createdDate: Date;

  @ManyToOne(() => ReviewPost, (reviewPost) => reviewPost.reviewPostImages)
  reviewPost: ReviewPost;
}
