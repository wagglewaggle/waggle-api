import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ListFilterQueryDto, PlaceParamDto } from '../app/app.dto';
import { IRequestAugmented } from '../app/app.interface';
import { UserGuard } from '../app/guards/user.guard';
import { IListCountResponse } from '../app/interfaces/common.interface';
import { ListFilterPipe, PlaceParamPipe } from '../app/pipe/common.pipe';
import { ReviewPostListResponseDto } from './dtos/review-post-list-response.dto';
import { ReviewPostResponseDto } from './dtos/review-post-response.dto';
import { ApiPath } from './review-post.constant';
import { CreateReviewPostBodyDto, GetOneReviewPostParamDto } from './review-post.dto';
import { ReviewPostIdxPipe } from './review-post.pipe';
import { ReviewPostService } from './review-post.service';

@Controller(ApiPath.Root)
@UseGuards(UserGuard)
export class ReviewPostController {
  constructor(private readonly reviewPostService: ReviewPostService) {}

  @Post()
  async addReviewPost(@Req() req: IRequestAugmented, @Body() body: CreateReviewPostBodyDto) {
    const user = req.extras.getUser();
    const { placeIdx, placeType, content, imgUrl } = body;
    await this.reviewPostService.addReviewPost(user, placeIdx, placeType, content, imgUrl);
  }

  @Get(`${ApiPath.GetPlaceType}/${ApiPath.GetPlaceIdx}`)
  async getReviewPostsByPlace(
    @Param(PlaceParamPipe) param: PlaceParamDto,
    @Query(ListFilterPipe) query: ListFilterQueryDto,
  ): Promise<IListCountResponse<ReviewPostListResponseDto>> {
    const [reviewPosts, count] = await this.reviewPostService.getReviewPostsByPlace(param.idx, param.type, query);
    return { list: reviewPosts.map((reviewPost) => new ReviewPostListResponseDto(reviewPost)), count };
  }

  @Get(`${ApiPath.GetPlaceType}/${ApiPath.GetPlaceIdx}/${ApiPath.GetReviewPostIdx}`)
  async getReviewPost(@Param(PlaceParamPipe, ReviewPostIdxPipe) param: GetOneReviewPostParamDto): Promise<ReviewPostResponseDto> {
    const { idx, type, reviewPostIdx } = param;
    const reviewPost = await this.reviewPostService.getReviewPost(idx, type, reviewPostIdx);
    return new ReviewPostResponseDto(reviewPost);
  }
}
