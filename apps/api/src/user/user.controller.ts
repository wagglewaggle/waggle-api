import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { IRequestAugmented } from '../app/app.interface';
import { UserGuard } from '../app/guards/user.guard';
import { UserResponseDto } from './dtos/user-response.dto';
import { ApiPath } from './user.constant';
import { UserService } from './user.service';

@Controller(ApiPath.Root)
@UseGuards(UserGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(ApiPath.Setting)
  async getUserSetting(@Req() req: IRequestAugmented): Promise<UserResponseDto> {
    return new UserResponseDto(req.extras.getUser());
  }
}
