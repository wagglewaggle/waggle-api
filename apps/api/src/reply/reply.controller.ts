import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { IRequestAugmented } from '../app/app.interface';
import { UserGuard } from '../app/guards/user.guard';
import { PlaceParamPipe } from '../app/pipe/common.pipe';
import { GetOneReviewPostParamDto } from '../review-post/review-post.dto';
import { ReviewPostIdxPipe } from '../review-post/review-post.pipe';
import { ApiPath } from './reply.constant';
import { CreateReplyDto } from './reply.dto';
import { ReplyService } from './reply.service';

@Controller(ApiPath.Root)
@UseGuards(UserGuard)
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @Post()
  async addReply(
    @Req() req: IRequestAugmented,
    @Param(PlaceParamPipe, ReviewPostIdxPipe) param: GetOneReviewPostParamDto,
    @Body() body: CreateReplyDto,
  ) {
    const user = req.extras.getUser();
    const { idx, type, reviewPostIdx } = param;
    await this.replyService.addReply(user, idx, type, reviewPostIdx, body.content);
  }
}
