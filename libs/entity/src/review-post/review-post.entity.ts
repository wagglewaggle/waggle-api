import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ExtraPlace } from '../extra-place/extra-place.entity';
import { KtPlace } from '../kt-place/kt-place.entity';
import { PinReviewPost } from '../pin-review-post/pin-review-post.entity';
import { Reply } from '../reply/reply.entity';
import { ReviewPostImage } from '../review-post-image/review-post-image.entity';
import { SktPlace } from '../skt-place/skt-place.entity';
import { User } from '../user/user.entity';
import { ReviewPostStatus } from './review-post.constant';

@Entity()
export class ReviewPost {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column('text')
  content: string;

  @Column('int')
  view: number;

  @Column('int')
  report: number;

  @Column('enum', { enum: ReviewPostStatus })
  status: ReviewPostStatus;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @OneToMany(() => Reply, (reply) => reply.reviewPost)
  replies: Reply[];

  @OneToMany(() => ReviewPostImage, (reviewPostImage) => reviewPostImage.reviewPost)
  reviewPostImages: ReviewPostImage[];

  @OneToMany(() => PinReviewPost, (pinReviewPost) => pinReviewPost.reviewPost)
  pinReviewPosts: PinReviewPost[];

  @ManyToOne(() => User, (user) => user.reviewPosts)
  user: User;

  @ManyToOne(() => SktPlace, (sktPlace) => sktPlace.reviewPosts, { nullable: true })
  sktPlace: SktPlace;

  @ManyToOne(() => KtPlace, (ktPlace) => ktPlace.reviewPosts, { nullable: true })
  ktPlace: KtPlace;

  @ManyToOne(() => ExtraPlace, (extraPlace) => extraPlace.reviewPosts, { nullable: true })
  extraPlace: ExtraPlace;
}
