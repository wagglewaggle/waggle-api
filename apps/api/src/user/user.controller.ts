/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, HttpStatus, Put, Query, Req, UseGuards } from '@nestjs/common';
import { IRequestAugmented } from '../app/app.interface';
import { UserGuard } from '../app/guards/user.guard';
import { UserResponseDto } from './dtos/user-response.dto';
import { ApiPath } from './user.constant';
import { ModifyUserSettingBodyDto, NicknameValidationCheckQueryDto } from './user.interface';
import { UserService } from './user.service';
import ERROR_CODE from '../app/exceptions/error-code';
import { ClientRequestException } from '../app/exceptions/request.exception';
import { USERNAME_RULE } from '../app/validations/common.validation';
import { ReviewPostService } from '../review-post/review-post.service';
import { ListFilterQueryDto } from '../app/app.dto';
import { IListCountResponse } from '../app/interfaces/common.interface';
import { ReviewPostSimpleResponseDto } from '../review-post/dtos/review-post-simple-response.dto';
import { PinReviewPostService } from '../pin-review-post/pin-review-post.service';
import { ListFilterPipe } from '../app/pipe/common.pipe';
import { ReplyService } from '../reply/reply.service';
import { UserRepliesResponseDto } from './dtos/user-replies-response.dto';
import { UserStatus } from 'waggle-entity/dist/user/user.constant';

@Controller(ApiPath.Root)
@UseGuards(UserGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly reviewPostService: ReviewPostService,
    private readonly pinReviewPostService: PinReviewPostService,
    private readonly replyService: ReplyService,
  ) {}

  @Get(ApiPath.Setting)
  async getUserSetting(@Req() req: IRequestAugmented): Promise<UserResponseDto> {
    return new UserResponseDto(req.extras.getUser());
  }

  @Put(ApiPath.Setting)
  async modifyUserSetting(@Req() req: IRequestAugmented, @Body() body: ModifyUserSettingBodyDto) {
    const user = req.extras.getUser();
    await this.userService.modifyUserSetting(user, body);
  }

  @Put(ApiPath.Deactivate)
  async deactivateUser(@Req() req: IRequestAugmented) {
    const user = req.extras.getUser();
    await this.userService.modifyUserStatus(user.idx, UserStatus.Deactivated);
  }

  @Get(`${ApiPath.Validate}/${ApiPath.Nickname}`)
  @HttpCode(HttpStatus.NO_CONTENT)
  async checkValidateNickname(@Query() query: NicknameValidationCheckQueryDto) {
    const isDuplicatedUser = await this.userService.getUserByNickname(query.nickname);
    if (isDuplicatedUser) {
      throw new ClientRequestException(ERROR_CODE.ERR_0006010, HttpStatus.BAD_REQUEST);
    }
    if (!USERNAME_RULE.test(query.nickname)) {
      throw new ClientRequestException(ERROR_CODE.ERR_0006007, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(ApiPath.ReviewPost)
  @HttpCode(HttpStatus.OK)
  async getReviewPostsByUser(
    @Req() req: IRequestAugmented,
    @Query(ListFilterPipe) query: ListFilterQueryDto,
  ): Promise<IListCountResponse<ReviewPostSimpleResponseDto>> {
    const user = req.extras.getUser();
    const pinReviewPostIdxMap = await this.pinReviewPostService.getMapPinReviewPostIdx(user);
    const [reviewPosts, count] = await this.reviewPostService.getReviewPostsByUser(user, query);
    return { list: reviewPosts.map((reviewPost) => new ReviewPostSimpleResponseDto(reviewPost, pinReviewPostIdxMap)), count };
  }

  @Get(ApiPath.Reply)
  @HttpCode(HttpStatus.OK)
  async getRepliesByUser(
    @Req() req: IRequestAugmented,
    @Query(ListFilterPipe) query: ListFilterQueryDto,
  ): Promise<IListCountResponse<UserRepliesResponseDto>> {
    const user = req.extras.getUser();
    const [replies, count] = await this.replyService.getRepliesByUser(user, query);
    return { list: replies.map((reply) => new UserRepliesResponseDto(reply)), count };
  }
}
