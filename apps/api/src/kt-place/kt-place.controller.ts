import { Controller, Get, Param } from '@nestjs/common';
import { KtPlaceIdxParamDto } from './kt-place.dto';
import { KtPlaceService } from './kt-place.service';
import { KtPlaceResponseDto } from './dtos/kt-place-reponse.dto';

@Controller('kt-place')
export class KtPlaceController {
  constructor(private readonly ktPlaceService: KtPlaceService) {}

  @Get()
  async getKtPlaces(): Promise<KtPlaceResponseDto[]> {
    const places = await this.ktPlaceService.getKtPlaces();
    return places.map((place) => new KtPlaceResponseDto(place));
  }

  @Get(':idx')
  async getKtPlace(@Param() param: KtPlaceIdxParamDto): Promise<KtPlaceResponseDto> {
    const place = await this.ktPlaceService.getKtPlaceAllInfo(param.idx);
    return new KtPlaceResponseDto(place);
  }

  // @Get('')
}
