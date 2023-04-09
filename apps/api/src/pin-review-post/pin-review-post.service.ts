import { forwardRef, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PinReviewPost } from '@lib/entity/pin-review-post/pin-review-post.entity';
import { ReviewPostService } from '../review-post/review-post.service';
import { UserEntity } from '../user/entity/user.entity';
import { PinReviewPostRepository } from './pin-review-post.repository';
import { ClientRequestException } from '../app/exceptions/request.exception';
import ERROR_CODE from '../app/exceptions/error-code';

@Injectable()
export class PinReviewPostService {
  constructor(
    private readonly pinReviewPostRepository: PinReviewPostRepository,
    @Inject(forwardRef(() => ReviewPostService)) private readonly reviewPostService: ReviewPostService,
  ) {}

  async addPinReviewPost(user: UserEntity, reviewPostIdx: number) {
    const reviewPost = await this.reviewPostService.getReviewPostByIdx(reviewPostIdx);
    const existPinReviewPost = await this.pinReviewPostRepository.getPinReviewPost({ user: { idx: user.idx }, reviewPost: { idx: reviewPostIdx } });
    if (existPinReviewPost) {
      throw new ClientRequestException(ERROR_CODE.ERR_0010001, HttpStatus.BAD_REQUEST);
    }

    const pinReviewPost = this.pinReviewPostRepository.createInstance({ user, reviewPost });
    await this.pinReviewPostRepository.addPinReviewPost(pinReviewPost);
  }

  async getPinReviewPostsByUser(user: UserEntity): Promise<[PinReviewPost[], number]> {
    return await this.pinReviewPostRepository.getPinReviewPosts(user);
  }

  async getMapPinReviewPostIdx(user: UserEntity): Promise<Map<number, boolean>> {
    const [pinReviewPosts] = await this.getPinReviewPostsByUser(user);
    return new Map(pinReviewPosts.map(({ reviewPost }) => [reviewPost.idx, true]));
  }

  async deletePinReviewPost(user: UserEntity, pinReviewPostIdx: number) {
    const pinReviewPost = await this.pinReviewPostRepository.getPinReviewPost({ idx: pinReviewPostIdx }, ['user']);
    if (!pinReviewPost) {
      throw new ClientRequestException(ERROR_CODE.ERR_0010002, HttpStatus.BAD_REQUEST);
    }
    if (pinReviewPost.user.idx !== user.idx) {
      throw new ClientRequestException(ERROR_CODE.ERR_0000005, HttpStatus.FORBIDDEN);
    }

    await this.pinReviewPostRepository.deletePinReviewPost(pinReviewPost);
  }
}
