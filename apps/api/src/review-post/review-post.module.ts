import { Module } from '@nestjs/common';
import { ReviewPostService } from './review-post.service';
import { ReviewPostController } from './review-post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewPost } from '@lib/entity/review-post/review-post.entity';
import { ReviewPostRepository } from './review-post.repository';
import { PlaceModule } from '../place/place.module';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewPost]), PlaceModule],
  providers: [ReviewPostService, ReviewPostRepository],
  controllers: [ReviewPostController],
  exports: [TypeOrmModule, ReviewPostService],
})
export class ReviewPostModule {}
