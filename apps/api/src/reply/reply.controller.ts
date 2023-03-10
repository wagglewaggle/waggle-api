import { Body, Controller, Delete, Param, Post, Req, UseGuards } from '@nestjs/common';
import { IRequestAugmented } from '../app/app.interface';
import { UserGuard } from '../app/guards/user.guard';
import { PlaceParamPipe } from '../app/pipe/common.pipe';
import { GetOneReviewPostParamDto } from '../review-post/review-post.dto';
import { ReviewPostIdxPipe } from '../review-post/review-post.pipe';
import { ApiPath } from './reply.constant';
import { CreateReplyDto, GetReplyIdxParamDto } from './reply.dto';
import { ReplyIdxPipe } from './reply.pipe';
import { ReplyService } from './reply.service';

@Controller(ApiPath.Root)
@UseGuards(UserGuard)
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @Post()
  async addMainReply(
    @Req() req: IRequestAugmented,
    @Param(PlaceParamPipe, ReviewPostIdxPipe) param: GetOneReviewPostParamDto,
    @Body() body: CreateReplyDto,
  ) {
    const user = req.extras.getUser();
    const { idx, type, reviewPostIdx } = param;
    await this.replyService.addReply(user, idx, type, reviewPostIdx, body.content, 0, 0);
  }

  @Post(ApiPath.GetReplyIdx)
  async addLevelReply(
    @Req() req: IRequestAugmented,
    @Param(PlaceParamPipe, ReviewPostIdxPipe, ReplyIdxPipe) param: GetReplyIdxParamDto,
    @Body() body: CreateReplyDto,
  ) {
    const user = req.extras.getUser();
    await this.replyService.addLevelReply(user, param, body.content);
  }

  @Delete(ApiPath.GetReplyIdx)
  async deleteReply(@Req() req: IRequestAugmented, @Param(ReplyIdxPipe) param: GetReplyIdxParamDto) {
    const user = req.extras.getUser();
    const { replyIdx } = param;
    await this.replyService.deleteReply(user, replyIdx);
  }
}
