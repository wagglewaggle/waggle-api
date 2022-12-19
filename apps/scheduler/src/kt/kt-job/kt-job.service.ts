import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { config } from '@lib/config';
import { KtAccidentEntity } from '../kt-accident/entity/kt-accident.entity';
import { KtAccidentService } from '../kt-accident/kt-accident.service';
import { KtPlaceService } from '../kt-place/kt-place.service';
import { KtPopulationEntity } from '../kt-population/entity/kt-population.entity';
import { KtPopulationService } from '../kt-population/kt-population.service';
import { IAccidentObject, IKtCityData } from './kt-city-data.interface';
import { KtDefaultInfo } from './kt-job.constant';
import { sleep } from '../../app/app.util';
import { KtPlace } from '@lib/entity/kt-place/kt-place.entity';
import { DataSource, QueryRunner } from 'typeorm';
import { KtRoadTrafficService } from '../kt-road-traffic/kt-road-traffic.service';
import { KtRoadTrafficEntity } from '../kt-road-traffic/entity/kt-road-traffic.entity';

@Injectable()
export class KtJobService {
  private readonly logger: Logger;
  private readonly xmlParser: XMLParser;
  private readonly url: string;
  private readonly rate: number;

  constructor(
    private readonly ktPlaceService: KtPlaceService,
    private readonly ktPopulationService: KtPopulationService,
    private readonly ktAccidentService: KtAccidentService,
    private readonly ktRoadTrafficService: KtRoadTrafficService,
    private readonly dataSource: DataSource,
  ) {
    this.logger = new Logger(KtJobService.name);
    this.xmlParser = new XMLParser();
    this.url = `${KtDefaultInfo.API_HOST}/${config.ktApiKey}/${KtDefaultInfo.API_URI}`;
    this.rate = 10;
  }

  @Cron('*/5 * * * *')
  async run() {
    try {
      const places = await this.ktPlaceService.getKtPlaces();

      for (let i = 0; i <= places.length / this.rate; i++) {
        await Promise.all(
          places.slice(i * this.rate, (i + 1) * this.rate).map(async (place) => {
            const { data } = await axios.get(`${this.url}/${place.name}`);
            const result: IKtCityData = await this.xmlParser.parse(data);

            await this.updateKtAccident(place, result['SeoulRtd.citydata'].CITYDATA.ACDNT_CNTRL_STTS);

            await this.ktPopulationService.addKtPopulation(new KtPopulationEntity(place, result['SeoulRtd.citydata'].CITYDATA.LIVE_PPLTN_STTS));
            await this.ktRoadTrafficService.addKtRoadTraffic(
              new KtRoadTrafficEntity(place, result['SeoulRtd.citydata'].CITYDATA.ROAD_TRAFFIC_STTS.AVG_ROAD_DATA),
            );
          }),
        );

        await sleep(3000);
      }

      this.logger.log(`successfully done`);
    } catch (e) {
      this.logger.warn('This is run ' + e);
      throw e;
    }
  }

  async updateKtAccident(place: KtPlace, accident: string | IAccidentObject) {
    try {
      if (typeof accident !== 'string') {
        await this.preprocessKtAccident(place);

        const { ACDNT_CNTRL_STTS } = accident;
        if (Array.isArray(ACDNT_CNTRL_STTS)) {
          await Promise.all(ACDNT_CNTRL_STTS.map((accident) => this.ktAccidentService.addKtAccident(new KtAccidentEntity(place, accident))));
        } else {
          await this.ktAccidentService.addKtAccident(new KtAccidentEntity(place, ACDNT_CNTRL_STTS));
        }
      }
    } catch (e) {
      this.logger.error('This is updateKtAccident ' + e);
      throw e;
    }
  }

  async preprocessKtAccident(place: KtPlace) {
    const connection = this.dataSource;
    const queryRunner: QueryRunner = connection.createQueryRunner();
    const manager = queryRunner.manager;
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { accidents } = await this.ktPlaceService.getKtPlaceAndAccidents(place.idx);
      await Promise.all(accidents.map((accident) => this.ktAccidentService.deleteKtAccident(accident, manager)));
      await queryRunner.commitTransaction();
    } catch (e) {
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }
      throw e;
    } finally {
      await queryRunner.release();
    }
  }
}
