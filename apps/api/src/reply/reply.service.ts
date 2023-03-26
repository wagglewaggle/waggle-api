import { HttpStatus, Injectable } from '@nestjs/common';
import { ReplyStatus } from '@lib/entity/reply/reply.constant';
import { UserEntity } from '../user/entity/user.entity';
import { ReplyRepository } from './reply.repository';
import { DEFAULT_REPORT_COUNT, PlaceType } from '../app/app.constant';
import { ReviewPostService } from '../review-post/review-post.service';
import { ClientRequestException } from '../app/exceptions/request.exception';
import ERROR_CODE from '../app/exceptions/error-code';
import { GetReplyIdxParamDto } from './reply.dto';
import { SlackService } from '../app/slack/slack.service';
import { ReplyReportService } from '../reply-report/reply-report.service';
import { DataSource, QueryRunner } from 'typeorm';

@Injectable()
export class ReplyService {
  constructor(
    private readonly replyRepository: ReplyRepository,
    private readonly reviewPostService: ReviewPostService,
    private readonly replyReportService: ReplyReportService,
    private readonly slackService: SlackService,
    private readonly dataSource: DataSource,
  ) {}

  async addReply(
    user: UserEntity,
    placeIdx: number,
    placeType: PlaceType,
    reviewPostIdx: number,
    content: string,
    replyLevel: number,
    mainReplyIdx: number,
  ) {
    const reviewPost = await this.reviewPostService.getReviewPost(placeIdx, placeType, reviewPostIdx);
    const reply = this.replyRepository.createInstance({
      user,
      reviewPost,
      content,
      status: ReplyStatus.Activated,
      level: replyLevel,
      mainReplyIdx,
    });
    await this.replyRepository.addReply(reply);
  }

  async addLevelReply(user: UserEntity, param: GetReplyIdxParamDto, content: string) {
    const reply = await this.replyRepository.getReply({ idx: param.replyIdx }, ['user']);
    if (!reply) {
      throw new ClientRequestException(ERROR_CODE.ERR_0009001, HttpStatus.BAD_REQUEST);
    }

    await this.addReply(user, param.idx, param.type, param.reviewPostIdx, content, reply.level + 1, reply.idx);
  }

  async deleteReply(user: UserEntity, replyIdx: number) {
    const reply = await this.replyRepository.getReply({ idx: replyIdx }, ['user']);
    if (!reply) {
      throw new ClientRequestException(ERROR_CODE.ERR_0009001, HttpStatus.BAD_REQUEST);
    }
    if (reply.user.idx !== user.idx) {
      throw new ClientRequestException(ERROR_CODE.ERR_0000005, HttpStatus.FORBIDDEN);
    }
    if (reply.status !== ReplyStatus.Activated) {
      throw new ClientRequestException(ERROR_CODE.ERR_0009002, HttpStatus.BAD_REQUEST);
    }

    await this.replyRepository.updateReply({ idx: replyIdx }, { status: ReplyStatus.Deleted });
  }

  async modifyContentReply(user: UserEntity, replyIdx: number, content: string) {
    const reply = await this.replyRepository.getReply({ idx: replyIdx }, ['user']);
    if (!reply) {
      throw new ClientRequestException(ERROR_CODE.ERR_0009001, HttpStatus.BAD_REQUEST);
    }
    if (reply.user.idx !== user.idx) {
      throw new ClientRequestException(ERROR_CODE.ERR_0000005, HttpStatus.FORBIDDEN);
    }
    if (reply.status !== ReplyStatus.Activated) {
      throw new ClientRequestException(ERROR_CODE.ERR_0009002, HttpStatus.BAD_REQUEST);
    }

    await this.replyRepository.updateReply({ idx: replyIdx }, { content });
  }

  async reportReply(user: UserEntity, replyIdx: number) {
    const connection = this.dataSource;
    const queryRunner: QueryRunner = connection.createQueryRunner();
    const manager = queryRunner.manager;
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const reply = await this.replyRepository.getReply({ idx: replyIdx }, [
        'user',
        'reviewPost',
        'reviewPost.ktPlace',
        'reviewPost.sktPlace',
        'reviewPost.extraPlace',
      ]);
      if (!reply) {
        throw new ClientRequestException(ERROR_CODE.ERR_0009001, HttpStatus.BAD_REQUEST);
      }
      if (reply.status !== ReplyStatus.Activated) {
        throw new ClientRequestException(ERROR_CODE.ERR_0009002, HttpStatus.BAD_REQUEST);
      }

      const replyReports = await this.replyReportService.getReviewPostReport(reply);
      if (replyReports.find((report) => report.user.idx === user.idx)) {
        throw new ClientRequestException(ERROR_CODE.ERR_0011002, HttpStatus.BAD_REQUEST);
      }

      await this.replyReportService.addReviewPostReport(user, reply, manager);

      if (replyReports.length + 1 >= DEFAULT_REPORT_COUNT) {
        await this.replyRepository.updateReply({ idx: replyIdx }, { status: ReplyStatus.ReportDeleted }, manager);
        this.slackService.reportReply(reply);
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
