import { Controller, Get } from '@nestjs/common';
import { ApiPath } from './statistic.constant';
import { StatisticService } from './statistic.service';

@Controller(ApiPath.Root)
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @Get()
  async getStatistic() {
    return await this.statisticService.getStatistic();
  }
}
