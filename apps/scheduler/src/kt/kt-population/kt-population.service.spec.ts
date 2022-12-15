import { Test, TestingModule } from '@nestjs/testing';
import { KtPopulationService } from './kt-population.service';

describe('KtPopulationService', () => {
  let service: KtPopulationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KtPopulationService],
    }).compile();

    service = module.get<KtPopulationService>(KtPopulationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
