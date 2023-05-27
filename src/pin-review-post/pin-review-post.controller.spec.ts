import { Test, TestingModule } from '@nestjs/testing';
import { PinReviewPostController } from './pin-review-post.controller';

describe('PinReviewPostController', () => {
  let controller: PinReviewPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PinReviewPostController],
    }).compile();

    controller = module.get<PinReviewPostController>(PinReviewPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
