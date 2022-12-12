import { Controller, Get, Param } from '@nestjs/common';
import { KtPlace } from '../app/entities/kt-place/kt-place.entity';
import { KtPlaceIdxParamDto } from './kt-place.dto';
import { KtPlaceService } from './kt-place.service';

@Controller('kt-place')
export class KtPlaceController {
  constructor(private readonly ktPlaceService: KtPlaceService) {}

  @Get()
  async getKtPlaces(): Promise<KtPlace[]> {
    return await this.ktPlaceService.getKtPlaces();
  }

  @Get(':idx')
  async getKtplace(@Param() param: KtPlaceIdxParamDto) {
    return await this.ktPlaceService.getKtPlaceAllInfo(param.idx);
  }

  // @Get('')
}
