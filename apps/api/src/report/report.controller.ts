import { Controller, HttpCode, HttpStatus, Param, Put, Req, UseGuards } from '@nestjs/common';
import { IRequestAugmented } from '../app/app.interface';
import { UserGuard } from '../app/guards/user.guard';
import { ReplyIdxPipe } from '../reply/reply.pipe';
import { ReviewPostIdxPipe } from '../review-post/review-post.pipe';
import { ApiPath } from './report.constant';
import { ReplyIdxParamDto, ReviewPostIdxParamDto } from './report.dto';
import { ReportService } from './report.service';

@Controller(ApiPath.Root)
@UseGuards(UserGuard)
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Put(ApiPath.ReviewPost)
  @HttpCode(HttpStatus.OK)
  async reportReviewPost(@Req() req: IRequestAugmented, @Param(ReviewPostIdxPipe) param: ReviewPostIdxParamDto) {
    const user = req.extras.getUser();
    await this.reportService.reportReviewPost(user, param.reviewPostIdx);
  }

  @Put(ApiPath.Reply)
  @HttpCode(HttpStatus.OK)
  async reportReply(@Param(ReplyIdxPipe) param: ReplyIdxParamDto) {
    await this.reportService.reportReply(param.replyIdx);
  }
}
