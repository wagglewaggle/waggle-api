import { Body, Controller, Delete, forwardRef, Get, Inject, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ListFilterQueryDto, PlaceParamDto } from '../app/app.dto';
import { IRequestAugmented } from '../app/app.interface';
import { UserGuard } from '../app/guards/user.guard';
import { IListCountResponse } from '../app/interfaces/common.interface';
import { ListFilterPipe, PlaceParamPipe } from '../app/pipe/common.pipe';
import { ReviewPostSimpleResponseDto } from './dtos/review-post-simple-response.dto';
import { ReviewPostResponseDto } from './dtos/review-post-response.dto';
import { ApiPath } from './review-post.constant';
import { CreateReviewPostBodyDto, GetOneReviewPostParamDto } from './review-post.dto';
import { ReviewPostIdxPipe } from './review-post.pipe';
import { ReviewPostService } from './review-post.service';
import { PinReviewPostService } from '../pin-review-post/pin-review-post.service';

@Controller(ApiPath.Root)
@UseGuards(UserGuard)
export class ReviewPostController {
  constructor(
    private readonly reviewPostService: ReviewPostService,
    @Inject(forwardRef(() => PinReviewPostService))
    private readonly pinReviewPostService: PinReviewPostService,
  ) {}

  @Post()
  async addReviewPost(@Req() req: IRequestAugmented, @Param(PlaceParamPipe) param: PlaceParamDto, @Body() body: CreateReviewPostBodyDto) {
    const user = req.extras.getUser();
    const { idx, type } = param;
    const { content, imgUrl } = body;
    await this.reviewPostService.addReviewPost(user, idx, type, content, imgUrl);
  }

  @Get()
  async getReviewPostsByPlace(
    @Req() req: IRequestAugmented,
    @Param(PlaceParamPipe) param: PlaceParamDto,
    @Query(ListFilterPipe) query: ListFilterQueryDto,
  ): Promise<IListCountResponse<ReviewPostSimpleResponseDto>> {
    const user = req.extras.getUser();
    const pinReviewPostIdxMap = await this.pinReviewPostService.getMapPinReviewPostIdx(user);
    const [reviewPosts, count] = await this.reviewPostService.getReviewPostsByPlace(param.idx, param.type, query);
    return { list: reviewPosts.map((reviewPost) => new ReviewPostSimpleResponseDto(reviewPost, pinReviewPostIdxMap)), count };
  }

  @Get(ApiPath.GetReviewPostIdx)
  async getReviewPost(
    @Req() req: IRequestAugmented,
    @Param(PlaceParamPipe, ReviewPostIdxPipe) param: GetOneReviewPostParamDto,
  ): Promise<ReviewPostResponseDto> {
    const user = req.extras.getUser();
    const { idx, type, reviewPostIdx } = param;
    const pinReviewPostIdxMap = await this.pinReviewPostService.getMapPinReviewPostIdx(user);
    const reviewPost = await this.reviewPostService.getReviewPost(idx, type, reviewPostIdx);
    return new ReviewPostResponseDto(reviewPost, pinReviewPostIdxMap);
  }

  @Delete(ApiPath.GetReviewPostIdx)
  async deleteReviewPost(@Req() req: IRequestAugmented, @Param(PlaceParamPipe, ReviewPostIdxPipe) param: GetOneReviewPostParamDto) {
    const user = req.extras.getUser();
    await this.reviewPostService.deleteReviewPost(user, param.idx, param.type, param.reviewPostIdx);
  }

  @Put(ApiPath.GetReviewPostIdx)
  async modifyReviewPost(
    @Req() req: IRequestAugmented,
    @Param(PlaceParamPipe, ReviewPostIdxPipe) param: GetOneReviewPostParamDto,
    @Body() body: CreateReviewPostBodyDto,
  ) {
    const user = req.extras.getUser();
    await this.reviewPostService.modifyReviewPost(user, param.idx, param.type, param.reviewPostIdx, body.content);
  }
}
