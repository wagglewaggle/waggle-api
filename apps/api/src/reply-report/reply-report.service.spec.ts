import { Test, TestingModule } from '@nestjs/testing';
import { ReplyReportService } from './reply-report.service';

describe('ReplyReportService', () => {
  let service: ReplyReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReplyReportService],
    }).compile();

    service = module.get<ReplyReportService>(ReplyReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
