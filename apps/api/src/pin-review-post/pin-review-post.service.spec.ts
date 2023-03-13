import { Test, TestingModule } from '@nestjs/testing';
import { PinReviewPostService } from './pin-review-post.service';

describe('PinReviewPostService', () => {
  let service: PinReviewPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PinReviewPostService],
    }).compile();

    service = module.get<PinReviewPostService>(PinReviewPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
