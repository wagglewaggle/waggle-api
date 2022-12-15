import { Test, TestingModule } from '@nestjs/testing';
import { SktPopulationService } from './skt-population.service';

describe('SktPopulationService', () => {
  let service: SktPopulationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SktPopulationService],
    }).compile();

    service = module.get<SktPopulationService>(SktPopulationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
