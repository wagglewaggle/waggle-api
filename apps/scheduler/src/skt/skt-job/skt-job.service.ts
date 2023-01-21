import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios, { AxiosResponse } from 'axios';
import { config } from '@lib/config';
import { SktPlaceService } from '../skt-place/skt-place.service';
import { SktPopulationEntity } from '../skt-population/entity/skt-population.entity';
import { SktPopulationService } from '../skt-population/skt-population.service';
import { ISktCityData } from './skt-city-data.interface';
import { SktDefaultInfo } from './skt-job.constant';
import { SktPlace } from '@lib/entity/skt-place/skt-place.entity';
import { SentryService } from '../../app/sentry/sentry.service';
import { JobType } from '../../app/app.constant';
import { LoggerService } from '../../app/logger/logger.service';

@Injectable()
export class SktJobService {
  private readonly url: string;

  constructor(
    private readonly sktPlaceService: SktPlaceService,
    private readonly sktPopulationService: SktPopulationService,
    private readonly sentryService: SentryService,
    private readonly loggerService: LoggerService,
  ) {
    this.url = `${SktDefaultInfo.API_HOST}/${SktDefaultInfo.API_URI}`;
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async run() {
    try {
      const places = await this.sktPlaceService.getSktPlaces();
      for (const place of places) {
        await this.updateSktPopulation(place);
      }

      this.loggerService.log(`successfully done`);
    } catch (e) {
      this.loggerService.error(e);
      this.sentryService.sendError(e, JobType.SKT);
    }
  }

  async updateSktPopulation(place: SktPlace) {
    try {
      const updatedDate = new Date();
      const { data }: AxiosResponse<ISktCityData> = await axios.get(`${this.url}/${place.poiId}`, {
        headers: {
          appKey: config.sktCongestionApiKey,
        },
      });
      const {
        contents: { rltm },
      } = data;

      await this.sktPopulationService.addSktPopulation(new SktPopulationEntity(place, rltm, updatedDate));
    } catch (e) {
      throw { error: e, place };
    }
  }
}
