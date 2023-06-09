import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserTokenService } from '../user-token/user-token.service';
import { ReviewPostService } from '../review-post/review-post.service';
import { PinReviewPostService } from '../pin-review-post/pin-review-post.service';
import { PinPlaceService } from '../pin-place/pin-place.service';

@Injectable()
export class StatisticService {
  constructor(
    private readonly userService: UserService,
    private readonly userTokenService: UserTokenService,
    private readonly reviewPostService: ReviewPostService,
    private readonly pinPlaceService: PinPlaceService,
    private readonly pinReviewPostService: PinReviewPostService,
  ) {}

  async getStatistic() {
    return {
      activatedUserCount: await this.userService.getActivatedUserCount(),
      activatedUserTokenCount: await this.userTokenService.getActivatedUserTokenCount(),
      reviewPostCount: await this.reviewPostService.getReviewPostCount(),
      pinPlaceCount: await this.pinPlaceService.getPinPlaceCount(),
      pinReviewPostCount: await this.pinReviewPostService.getPinReviewPostCount(),
    };
  }
}
