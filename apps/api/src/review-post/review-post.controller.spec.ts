import { Test, TestingModule } from '@nestjs/testing';
import { ReviewPostController } from './review-post.controller';

describe('ReviewPostController', () => {
  let controller: ReviewPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewPostController],
    }).compile();

    controller = module.get<ReviewPostController>(ReviewPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
