import { Test, TestingModule } from '@nestjs/testing';
import { ExtraPlaceService } from './extra-place.service';

describe('ExtraPlaceService', () => {
  let service: ExtraPlaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExtraPlaceService],
    }).compile();

    service = module.get<ExtraPlaceService>(ExtraPlaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
