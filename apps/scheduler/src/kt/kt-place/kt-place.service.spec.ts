import { Test, TestingModule } from '@nestjs/testing';
import { KtPlaceService } from './kt-place.service';

describe('KtPlaceService', () => {
  let service: KtPlaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KtPlaceService],
    }).compile();

    service = module.get<KtPlaceService>(KtPlaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
