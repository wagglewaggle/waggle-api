import { Test, TestingModule } from '@nestjs/testing';
import { ReviewPostService } from './review-post.service';

describe('ReviewPostService', () => {
  let service: ReviewPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewPostService],
    }).compile();

    service = module.get<ReviewPostService>(ReviewPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
