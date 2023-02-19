import { Test, TestingModule } from '@nestjs/testing';
import { PinPlaceController } from './pin-place.controller';

describe('PinPlaceController', () => {
  let controller: PinPlaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PinPlaceController],
    }).compile();

    controller = module.get<PinPlaceController>(PinPlaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
