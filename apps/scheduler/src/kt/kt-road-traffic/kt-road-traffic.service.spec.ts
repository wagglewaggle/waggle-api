import { Test, TestingModule } from '@nestjs/testing';
import { KtRoadTrafficService } from './kt-road-traffic.service';

describe('KtRoadTrafficService', () => {
  let service: KtRoadTrafficService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KtRoadTrafficService],
    }).compile();

    service = module.get<KtRoadTrafficService>(KtRoadTrafficService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
