import { Test, TestingModule } from '@nestjs/testing';
import { KtJobService } from './kt-job.service';

describe('KtJobService', () => {
  let service: KtJobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KtJobService],
    }).compile();

    service = module.get<KtJobService>(KtJobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
