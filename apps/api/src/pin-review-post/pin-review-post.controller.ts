import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { IRequestAugmented } from '../app/app.interface';
import { UserGuard } from '../app/guards/user.guard';
import { IListCountResponse } from '../app/interfaces/common.interface';
import { PinReviewPostResponseDto } from './dtos/pin-review-post-response.dto';
import { ApiPath } from './pin-review-post.constant';
import { PinReviewPostBodyDto } from './pin-review-post.dto';
import { PinReviewPostService } from './pin-review-post.service';

@Controller(ApiPath.Root)
@UseGuards(UserGuard)
export class PinReviewPostController {
  constructor(private readonly pinReviewPostService: PinReviewPostService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addPinReviewPost(@Req() req: IRequestAugmented, @Body() body: PinReviewPostBodyDto) {
    const user = req.extras.getUser();
    await this.pinReviewPostService.addPinReviewPost(user, body.idx);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getPinReviewPostByUser(@Req() req: IRequestAugmented): Promise<IListCountResponse<PinReviewPostResponseDto>> {
    const user = req.extras.getUser();
    const [pinReviewPosts, count] = await this.pinReviewPostService.getPinReviewPostsByUser(user);
    return { list: pinReviewPosts.map((pinReviewPost) => new PinReviewPostResponseDto(pinReviewPost)), count };
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async deletePinReviewPost(@Req() req: IRequestAugmented, @Body() body: PinReviewPostBodyDto) {
    const user = req.extras.getUser();
    await this.pinReviewPostService.deletePinReviewPost(user, body.idx);
  }
}
