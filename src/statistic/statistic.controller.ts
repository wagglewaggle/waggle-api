import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiPath } from './statistic.constant';
import { StatisticService } from './statistic.service';
import { UserGuard } from '../app/guards/user.guard';
import { AdminGuard } from '../app/guards/admin.guard';

@Controller(ApiPath.Root)
/** 가드는 admin controller가 기획되면 추가 */
// @UseGuards(UserGuard, AdminGuard)
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @Get()
  async getStatistic() {
    return await this.statisticService.getStatistic();
  }
}
