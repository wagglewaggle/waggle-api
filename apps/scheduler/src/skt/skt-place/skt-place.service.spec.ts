import { Test, TestingModule } from '@nestjs/testing';
import { SktPlaceService } from './skt-place.service';

describe('SktPlaceService', () => {
  let service: SktPlaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SktPlaceService],
    }).compile();

    service = module.get<SktPlaceService>(SktPlaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
