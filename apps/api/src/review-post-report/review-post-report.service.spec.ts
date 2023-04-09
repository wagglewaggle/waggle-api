import { Test, TestingModule } from '@nestjs/testing';
import { ReviewPostReportService } from './review-post-report.service';

describe('ReviewPostReportService', () => {
  let service: ReviewPostReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewPostReportService],
    }).compile();

    service = module.get<ReviewPostReportService>(ReviewPostReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
