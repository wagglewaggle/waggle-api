import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { KtPopulationLevel } from 'waggle-entity/dist/kt-population/kt-population.constant';
import { CategoryType } from 'waggle-entity/dist/category/category.constant';
import { Category } from 'waggle-entity/dist/category/category.entity';
import { SktPopulationLevel } from 'waggle-entity/dist/skt-population/skt-population.constant';

describe('ent-to-end Test', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('Health Check', () => {
    it('/health (GET)', async () => {
      const res = await request(app.getHttpServer()).get('/health');

      expect(res.statusCode).toBe(200);
      expect(res.body.hasOwnProperty('status')).toEqual(true);
      expect(res.body.status).toEqual('ok');
    });
  });

  describe('KT Place', () => {
    it('/kt-place (GET : 200)', async () => {
      const res = await request(app.getHttpServer()).get('/kt-place');

      expect(res.statusCode).toBe(200);
      expect(res.body.hasOwnProperty('list')).toEqual(true);
      expect(res.body.hasOwnProperty('count')).toEqual(true);
      expect(res.body.list.length).toEqual(res.body.count);
    });

    it('/kt-place?level=RELAXATION (GET : 200)', async () => {
      const res = await request(app.getHttpServer()).get(`/kt-place?level=${KtPopulationLevel.Relaxation}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.hasOwnProperty('list')).toEqual(true);
      expect(res.body.hasOwnProperty('count')).toEqual(true);

      if (res.body.list.length > 0) {
        const level = res.body.list[0]._population.level;
        expect(level).toEqual(KtPopulationLevel.Relaxation);
        expect(level).not.toEqual(KtPopulationLevel.VeryCrowded);
      }
    });

    it('/kt-place?category=공원 (GET : 200)', async () => {
      const res = await request(app.getHttpServer()).get(encodeURI(`/kt-place?category=${CategoryType.Park}`));

      expect(res.statusCode).toBe(200);
      expect(res.body.hasOwnProperty('list')).toEqual(true);
      expect(res.body.hasOwnProperty('count')).toEqual(true);

      if (res.body.list.length > 0) {
        const categories = res.body.list[0]._categories as Category[];
        expect(categories.findIndex((category) => category.type === CategoryType.Park)).not.toEqual(-1);
      }
    });

    it('/kt-place/1000 (GET : 400)', async () => {
      const res = await request(app.getHttpServer()).get(encodeURI(`/kt-place/1000`));

      expect(res.statusCode).toBe(400);
    });

    it('/kt-place/1 (GET : 200)', async () => {
      const res = await request(app.getHttpServer()).get(encodeURI(`/kt-place/1`));

      expect(res.statusCode).toBe(200);
      expect(res.body.hasOwnProperty('list')).not.toEqual(true);
      expect(res.body.hasOwnProperty('count')).not.toEqual(true);

      expect(res.body._idx).toEqual(1);
    });
  });

  describe('SKT Place', () => {
    it('/skt-place (GET : 200)', async () => {
      const res = await request(app.getHttpServer()).get('/skt-place');

      expect(res.statusCode).toBe(200);
      expect(res.body.hasOwnProperty('list')).toEqual(true);
      expect(res.body.hasOwnProperty('count')).toEqual(true);
      expect(res.body.list.length).toEqual(res.body.count);
    });

    it('/skt-place?level=RELAXATION (GET : 200)', async () => {
      const res = await request(app.getHttpServer()).get(`/skt-place?level=${SktPopulationLevel.Relaxation}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.hasOwnProperty('list')).toEqual(true);
      expect(res.body.hasOwnProperty('count')).toEqual(true);

      if (res.body.list.length > 0) {
        const level = res.body.list[0]._population.level;
        expect(level).toEqual(SktPopulationLevel.Relaxation);
        expect(level).not.toEqual(SktPopulationLevel.VeryCrowded);
      }
    });

    it('/skt-place?category=쇼핑몰 (GET : 200)', async () => {
      const res = await request(app.getHttpServer()).get(encodeURI(`/skt-place?category=${CategoryType.Shop}`));

      expect(res.statusCode).toBe(200);
      expect(res.body.hasOwnProperty('list')).toEqual(true);
      expect(res.body.hasOwnProperty('count')).toEqual(true);

      if (res.body.list.length > 0) {
        const categories = res.body.list[0]._categories as Category[];
        expect(categories.findIndex((category) => category.type === CategoryType.Shop)).not.toEqual(-1);
      }
    });

    it('/skt-place/1000 (GET : 400)', async () => {
      const res = await request(app.getHttpServer()).get(encodeURI(`/skt-place/1000`));

      expect(res.statusCode).toBe(400);
    });

    it('/skt-place/2 (GET : 200)', async () => {
      const res = await request(app.getHttpServer()).get(encodeURI(`/skt-place/2`));

      expect(res.statusCode).toBe(200);
      expect(res.body.hasOwnProperty('list')).not.toEqual(true);
      expect(res.body.hasOwnProperty('count')).not.toEqual(true);

      expect(res.body._idx).toEqual(2);
    });
  });

  describe('Location', () => {
    it('/location/광진구 (GET : 200)', async () => {
      const res = await request(app.getHttpServer()).get(encodeURI(`/location/광진구`));

      expect(res.statusCode).toBe(200);
      expect(res.body.hasOwnProperty('idx')).toEqual(true);
      expect(res.body.hasOwnProperty('name')).toEqual(true);

      expect(res.body.name).toEqual('광진구');
    });

    it('/location/팔달구 (GET : 400)', async () => {
      const res = await request(app.getHttpServer()).get(encodeURI(`/location/팔달구`));

      expect(res.statusCode).toBe(400);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
