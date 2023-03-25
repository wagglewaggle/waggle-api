import { HttpStatus, Injectable } from '@nestjs/common';
import { ReplyStatus } from '@lib/entity/reply/reply.constant';
import { UserEntity } from '../user/entity/user.entity';
import { ReplyRepository } from './reply.repository';
import { PlaceType } from '../app/app.constant';
import { ReviewPostService } from '../review-post/review-post.service';
import { ClientRequestException } from '../app/exceptions/request.exception';
import ERROR_CODE from '../app/exceptions/error-code';
import { GetReplyIdxParamDto } from './reply.dto';

@Injectable()
export class ReplyService {
  constructor(private readonly replyRepository: ReplyRepository, private readonly reviewPostService: ReviewPostService) {}

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
      report: 0,
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
}
