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
import { SlackService } from '../app/slack/slack.service';
import { ReviewPostReportService } from '../review-post-report/review-post-report.service';
import { DataSource, QueryRunner } from 'typeorm';

@Injectable()
export class ReviewPostService {
  constructor(
    private readonly reviewPostRepository: ReviewPostRepository,
    private readonly reviewPostReportService: ReviewPostReportService,
    private readonly placeService: PlaceService,
    private readonly slackService: SlackService,
    private readonly dataSource: DataSource,
  ) {}

  async addReviewPost(user: UserEntity, placeIdx: number, placeType: PlaceType, content: string, imgUrl?: string) {
    const placeObject = await this.placeService.getRefinedPlaceObject(placeIdx, placeType);

    const reviewPost = this.reviewPostRepository.createInstance({
      content,
      view: 0,
      status: ReviewPostStatus.Activated,
      user,
      ...placeObject,
    });
    await this.reviewPostRepository.addReviewPost(reviewPost);
  }

  async getReviewPostsByUser(user: UserEntity, query?: ListFilterQueryDto): Promise<[ReviewPostEntity[], number]> {
    return await this.reviewPostRepository.getReviewPostsByUser(user, query);
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

  async reportReviewPost(user: UserEntity, reviewPostIdx: number) {
    const connection = this.dataSource;
    const queryRunner: QueryRunner = connection.createQueryRunner();
    const manager = queryRunner.manager;
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const reviewPost = await this.reviewPostRepository.getReviewPost({ idx: reviewPostIdx }, ['user', 'ktPlace', 'sktPlace', 'extraPlace']);
      if (!reviewPost) {
        throw new ClientRequestException(ERROR_CODE.ERR_0008001, HttpStatus.BAD_REQUEST);
      }
      if (reviewPost.status !== ReviewPostStatus.Activated) {
        throw new ClientRequestException(ERROR_CODE.ERR_0008003, HttpStatus.BAD_REQUEST);
      }

      const reviewPostReports = await this.reviewPostReportService.getReviewPostReport(reviewPost);
      if (reviewPostReports.find((report) => report.user.idx === user.idx)) {
        throw new ClientRequestException(ERROR_CODE.ERR_0011001, HttpStatus.BAD_REQUEST);
      }

      await this.reviewPostReportService.addReviewPostReport(user, reviewPost, manager);

      if (reviewPostReports.length + 1 >= DEFAULT_REPORT_COUNT) {
        await this.reviewPostRepository.updateReviewPost({ idx: reviewPostIdx }, { status: ReviewPostStatus.ReportDeleted }, manager);
        this.slackService.reportReviewPost(reviewPost);
      }

      await queryRunner.commitTransaction();
    } catch (e) {
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }
      throw e;
    } finally {
      await queryRunner.release();
    }
  }
}
