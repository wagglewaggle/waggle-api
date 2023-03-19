import { Body, Controller, Get, HttpCode, HttpStatus, Put, Req, UseGuards } from '@nestjs/common';
import { UserStatus } from '@lib/entity/user/user.constant';
import { IRequestAugmented } from '../app/app.interface';
import { UserGuard } from '../app/guards/user.guard';
import { UserResponseDto } from './dtos/user-response.dto';
import { ApiPath } from './user.constant';
import { ModifyUserSettingBodyDto } from './user.interface';
import { UserService } from './user.service';
import ERROR_CODE from '../app/exceptions/error-code';
import { ClientRequestException } from '../app/exceptions/request.exception';
import { USERNAME_RULE } from '../app/validations/common.validation';

@Controller(ApiPath.Root)
@UseGuards(UserGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

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
  async checkValidateNickname(@Body() body: ModifyUserSettingBodyDto) {
    const isDuplicatedUser = await this.userService.getUserByNickname(body.nickname);
    if (isDuplicatedUser) {
      throw new ClientRequestException(ERROR_CODE.ERR_0006010, HttpStatus.BAD_REQUEST);
    }
    if (!USERNAME_RULE.test(body.nickname)) {
      throw new ClientRequestException(ERROR_CODE.ERR_0006007, HttpStatus.BAD_REQUEST);
    }
  }
}
