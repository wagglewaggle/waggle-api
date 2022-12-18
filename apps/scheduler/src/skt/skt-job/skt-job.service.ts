import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios, { AxiosResponse } from 'axios';
import { config } from '@lib/config';
import { SktPlaceService } from '../skt-place/skt-place.service';
import { SktPopulationEntity } from '../skt-population/entity/skt-population.entity';
import { SktPopulationService } from '../skt-population/skt-population.service';
import { ISktCityData } from './skt-city-data.interface';
import { SktDefaultInfo } from './skt-job.constant';
import { SktPlace } from '@lib/entity/skt-place/skt-place.entity';

@Injectable()
export class SktJobService {
  private readonly logger: Logger;
  private readonly url: string;

  constructor(private readonly sktPlaceService: SktPlaceService, private readonly sktPopulationService: SktPopulationService) {
    this.logger = new Logger(SktJobService.name);
    this.url = `${SktDefaultInfo.API_HOST}/${SktDefaultInfo.API_URI}`;
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async run() {
    try {
      const places = await this.sktPlaceService.getSktPlaces();
      for (const place of places) {
        await this.updateSktPopulation(place);
      }

      this.logger.log(`successfully done`);
    } catch (e) {
      this.logger.warn('failed');
      this.logger.warn(e);
      throw e;
    }
  }

  async updateSktPopulation(place: SktPlace) {
    try {
      const { data }: AxiosResponse<ISktCityData> = await axios.get(`${this.url}/${place.poiId}`, {
        headers: {
          appKey: config.sktCongestionApiKey,
        },
      });
      const {
        contents: { rltm },
      } = data;

      await this.sktPopulationService.addSktPopulation(new SktPopulationEntity(place, rltm));
    } catch (e) {
      this.logger.warn(e);
      throw e;
    }
  }
}
