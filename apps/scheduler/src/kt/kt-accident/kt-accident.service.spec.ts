import { Test, TestingModule } from '@nestjs/testing';
import { KtAccidentService } from './kt-accident.service';

describe('KtAccidentService', () => {
  let service: KtAccidentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KtAccidentService],
    }).compile();

    service = module.get<KtAccidentService>(KtAccidentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
