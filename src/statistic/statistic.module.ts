import { Module } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { StatisticController } from './statistic.controller';
import { UserModule } from '../user/user.module';
import { UserTokenModule } from '../user-token/user-token.module';
import { ReviewPostModule } from '../review-post/review-post.module';
import { PinReviewPostModule } from '../pin-review-post/pin-review-post.module';
import { PinPlaceModule } from '../pin-place/pin-place.module';

@Module({
  imports: [UserModule, UserTokenModule, ReviewPostModule, PinPlaceModule, PinReviewPostModule],
  providers: [StatisticService],
  controllers: [StatisticController],
})
export class StatisticModule {}
