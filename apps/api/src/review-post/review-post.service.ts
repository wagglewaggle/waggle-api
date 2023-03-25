import { HttpStatus, Injectable } from '@nestjs/common';
import { ReviewPostStatus } from '@lib/entity/review-post/review-post.constant';
import { DEFAULT_REPORT_COUNT, PlaceType } from '../app/app.constant';
import { PlaceService } from '../place/place.service';
import { UserEntity } from '../user/entity/user.entity';
import { ReviewPostRepository } from './review-post.repository';
import { ListFilterQueryDto } from '../app/app.dto';
import { ClientRequestException } from '../app/exceptions/request.exception';
import ERROR_CODE from '../app/exceptions/error-code';
import { ReviewPostEntity } from './entity/review-post.entity';

@Injectable()
export class ReviewPostService {
  constructor(private readonly reviewPostRepository: ReviewPostRepository, private readonly placeService: PlaceService) {}

  async addReviewPost(user: UserEntity, placeIdx: number, placeType: PlaceType, content: string, imgUrl?: string) {
    const placeObject = await this.placeService.getRefinedPlaceObject(placeIdx, placeType);

    const reviewPost = this.reviewPostRepository.createInstance({
      content,
      view: 0,
      report: 0,
      status: ReviewPostStatus.Activated,
      user,
      ...placeObject,
    });
    await this.reviewPostRepository.addReviewPost(reviewPost);
  }

  async getReviewPostsByPlace(idx: number, placeType: PlaceType, query: ListFilterQueryDto): Promise<[ReviewPostEntity[], number]> {
    const place = await this.placeService.getPlaceAllInfo(idx, placeType);
    return await this.reviewPostRepository.getReviewPostsByPlace(placeType, place, query);
  }

  async getReviewPostByIdx(idx: number): Promise<ReviewPostEntity> {
    const reviewPost = await this.reviewPostRepository.getReviewPost({ idx });
    if (!reviewPost) {
      throw new ClientRequestException(ERROR_CODE.ERR_0008001, HttpStatus.BAD_REQUEST);
    }
    return reviewPost;
  }

  async getReviewPost(idx: number, placeType: PlaceType, reviewPostIdx: number): Promise<ReviewPostEntity> {
    const place = await this.placeService.getPlaceAllInfo(idx, placeType);
    if (!place) {
      throw new ClientRequestException(ERROR_CODE.ERR_0002001, HttpStatus.BAD_REQUEST);
    }

    const reviewPost = await this.reviewPostRepository.getReviewPost({ idx: reviewPostIdx }, [
      'replies',
      'replies.user',
      'reviewPostImages',
      'pinReviewPosts',
      'pinReviewPosts.user',
      'user',
      'sktPlace',
      'ktPlace',
      'extraPlace',
    ]);
    if (!reviewPost) {
      throw new ClientRequestException(ERROR_CODE.ERR_0008001, HttpStatus.BAD_REQUEST);
    }

    /**
     * TODO: place type과 reviewPost의 place가 다를 경우 예외 처리
     */

    return reviewPost;
  }

  async deleteReviewPost(user: UserEntity, idx: number, placeType: PlaceType, reviewPostIdx: number) {
    const reviewPost = await this.getReviewPost(idx, placeType, reviewPostIdx);
    if (reviewPost.user.idx !== user.idx) {
      throw new ClientRequestException(ERROR_CODE.ERR_0000005, HttpStatus.FORBIDDEN);
    }
    if (reviewPost.status !== ReviewPostStatus.Activated) {
      throw new ClientRequestException(ERROR_CODE.ERR_0008003, HttpStatus.BAD_REQUEST);
    }

    await this.reviewPostRepository.updateReviewPost({ idx: reviewPostIdx }, { status: ReviewPostStatus.Deleted });
  }

  async modifyReviewPost(user: UserEntity, idx: number, placeType: PlaceType, reviewPostIdx: number, content: string) {
    const reviewPost = await this.getReviewPost(idx, placeType, reviewPostIdx);
    if (reviewPost.user.idx !== user.idx) {
      throw new ClientRequestException(ERROR_CODE.ERR_0000005, HttpStatus.FORBIDDEN);
    }

    await this.reviewPostRepository.updateReviewPost({ idx: reviewPostIdx }, { content });
  }

  async reportReviewPost(reviewPostIdx: number) {
    const reviewPost = await this.reviewPostRepository.getReviewPost({ idx: reviewPostIdx });
    if (!reviewPost) {
      throw new ClientRequestException(ERROR_CODE.ERR_0008001, HttpStatus.BAD_REQUEST);
    }
    if (reviewPost.status !== ReviewPostStatus.Activated) {
      throw new ClientRequestException(ERROR_CODE.ERR_0008003, HttpStatus.BAD_REQUEST);
    }

    if (reviewPost.report + 1 >= DEFAULT_REPORT_COUNT) {
      await this.reviewPostRepository.updateReviewPost(
        { idx: reviewPostIdx },
        { status: ReviewPostStatus.ReportDeleted, report: reviewPost.report + 1 },
      );
      return;
    }

    await this.reviewPostRepository.updateReviewPost({ idx: reviewPostIdx }, { report: reviewPost.report + 1 });
  }
}
