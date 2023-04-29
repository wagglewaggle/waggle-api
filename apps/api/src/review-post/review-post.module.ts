import { Module, forwardRef } from '@nestjs/common';
import { ReviewPostService } from './review-post.service';
import { ReviewPostController } from './review-post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewPost } from 'waggle-entity/dist/review-post/review-post.entity';
import { ReviewPostRepository } from './review-post.repository';
import { PlaceModule } from '../place/place.module';
import { PinReviewPostModule } from '../pin-review-post/pin-review-post.module';
import { SlackModule } from '../app/slack/slack.module';
import { ReviewPostReportModule } from '../review-post-report/review-post-report.module';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewPost]), PlaceModule, ReviewPostReportModule, forwardRef(() => PinReviewPostModule), SlackModule],
  providers: [ReviewPostService, ReviewPostRepository],
  controllers: [ReviewPostController],
  exports: [TypeOrmModule, ReviewPostService],
})
export class ReviewPostModule {}
