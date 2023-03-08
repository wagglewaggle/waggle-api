import { HttpStatus, Injectable } from '@nestjs/common';
import { ReplyStatus } from '@lib/entity/reply/reply.constant';
import { UserEntity } from '../user/entity/user.entity';
import { ReplyRepository } from './reply.repository';
import { PlaceType } from '../app/app.constant';
import { ReviewPostService } from '../review-post/review-post.service';
import { ClientRequestException } from '../app/exceptions/request.exception';
import ERROR_CODE from '../app/exceptions/error-code';

@Injectable()
export class ReplyService {
  constructor(private readonly replyRepository: ReplyRepository, private readonly reviewPostService: ReviewPostService) {}

  async addReply(user: UserEntity, placeIdx: number, placeType: PlaceType, reviewPostIdx: number, content: string) {
    const reviewPost = await this.reviewPostService.getReviewPost(placeIdx, placeType, reviewPostIdx);
    const reply = this.replyRepository.createInstance({ user, reviewPost, content, status: ReplyStatus.Activated, report: 0 });
    await this.replyRepository.addReply(reply);
  }

  async deleteReply(user: UserEntity, replyIdx: number) {
    const reply = await this.replyRepository.getReply({ idx: replyIdx }, ['user']);
    if (!reply) {
      throw new ClientRequestException(ERROR_CODE.ERR_0009001, HttpStatus.BAD_REQUEST);
    }

    if (reply.user.idx !== user.idx) {
      throw new ClientRequestException(ERROR_CODE.ERR_0000005, HttpStatus.FORBIDDEN);
    }

    await this.replyRepository.deleteReply(reply);
  }
}
