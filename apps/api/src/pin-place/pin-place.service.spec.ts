import { Test, TestingModule } from '@nestjs/testing';
import { PinPlaceService } from './pin-place.service';

describe('PinPlaceService', () => {
  let service: PinPlaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PinPlaceService],
    }).compile();

    service = module.get<PinPlaceService>(PinPlaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
