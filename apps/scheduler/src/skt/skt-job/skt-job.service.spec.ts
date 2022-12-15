import { Test, TestingModule } from '@nestjs/testing';
import { SktJobService } from './skt-job.service';

describe('SktJobService', () => {
  let service: SktJobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SktJobService],
    }).compile();

    service = module.get<SktJobService>(SktJobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
