import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios, { AxiosResponse } from 'axios';
import { config } from '@lib/config';
import { SktPlaceService } from '../skt-place/skt-place.service';
import { SktPopulationEntity } from '../skt-population/entity/skt-population.entity';
import { SktPopulationService } from '../skt-population/skt-population.service';
import { ISktCityData } from './skt-city-data.interface';
import { SktDefaultInfo } from './skt-job.constant';

@Injectable()
export class SktJobService {
  private readonly logger: Logger;
  private readonly url: string;

  constructor(private readonly sktPlaceService: SktPlaceService, private readonly sktPopulatiuonService: SktPopulationService) {
    this.logger = new Logger(SktJobService.name);
    this.url = `${SktDefaultInfo.API_HOST}/${SktDefaultInfo.API_URI}`;
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async run() {
    try {
      const places = await this.sktPlaceService.getSktPlace(1);

      const { data }: AxiosResponse<ISktCityData> = await axios.get(`${this.url}/${places.poiId}`, {
        headers: {
          appKey: config.sktCongestionApiKey,
        },
      });

      const {
        contents: { rltm },
      } = data;

      // TODO: update, not add
      await this.sktPopulatiuonService.addSktPopulation(new SktPopulationEntity(places, rltm));

      this.logger.log(`skt job done~!`);
      // for (const place of places) {
      // }
    } catch (e) {
      this.logger.warn(e);
      throw e;
    }
  }
}
