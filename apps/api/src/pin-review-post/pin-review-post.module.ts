import { Module } from '@nestjs/common';
import { PinReviewPostService } from './pin-review-post.service';
import { PinReviewPostController } from './pin-review-post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PinReviewPost } from '@lib/entity/pin-review-post/pin-review-post.entity';
import { PinReviewPostRepository } from './pin-review-post.repository';
import { ReviewPostModule } from '../review-post/review-post.module';

@Module({
  imports: [TypeOrmModule.forFeature([PinReviewPost]), ReviewPostModule],
  providers: [PinReviewPostService, PinReviewPostRepository],
  controllers: [PinReviewPostController],
})
export class PinReviewPostModule {}
