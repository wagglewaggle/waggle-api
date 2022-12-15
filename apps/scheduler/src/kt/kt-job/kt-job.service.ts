import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { config } from '@lib/config';
import { KtAccidentEntity } from '../kt-accident/entity/kt-accident.entity';
import { KtAccidentService } from '../kt-accident/kt-accident.service';
import { KtPlaceService } from '../kt-place/kt-place.service';
import { KtPopulationEntity } from '../kt-population/entity/kt-population.entity';
import { KtPopulationService } from '../kt-population/kt-population.service';
import { IKtCityData } from './kt-city-data.interface';
import { KtDefaultInfo } from './kt-job.constant';

@Injectable()
export class KtJobService {
  private readonly logger: Logger;
  private readonly xmlParser: XMLParser;
  private readonly url: string;

  constructor(
    private readonly ktPlaceService: KtPlaceService,
    private readonly ktPopulationService: KtPopulationService,
    private readonly ktAccidentService: KtAccidentService,
  ) {
    this.logger = new Logger(KtJobService.name);
    this.xmlParser = new XMLParser();
    this.url = `${KtDefaultInfo.API_HOST}/${config.ktApiKey}/${KtDefaultInfo.API_URI}`;
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async run() {
    try {
      const places = await this.ktPlaceService.getKtPlaces();

      for (const place of places) {
        const { data } = await axios.get(`${this.url}/${place.name}`);
        const result: IKtCityData = await this.xmlParser.parse(data);

        // TODO: array 처리
        if (typeof result['SeoulRtd.citydata'].CITYDATA.ACDNT_CNTRL_STTS !== 'string') {
          await this.ktAccidentService.addKtAccident(new KtAccidentEntity(place, result['SeoulRtd.citydata'].CITYDATA.ACDNT_CNTRL_STTS));
        }

        await this.ktPopulationService.addKtPopulation(new KtPopulationEntity(place, result['SeoulRtd.citydata'].CITYDATA.LIVE_PPLTN_STTS));
      }

      this.logger.log(`kt job done!`);
    } catch (e) {
      this.logger.warn(e);
      throw e;
    }
  }
}
