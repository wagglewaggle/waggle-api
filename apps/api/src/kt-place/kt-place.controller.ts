import { Controller, Get, Param, Query } from '@nestjs/common';
import { KtPlaceService } from './kt-place.service';
import { KtPlaceResponseDto } from './dtos/kt-place-reponse.dto';
import { PlaceIdxParamDto } from '../app/app.dto';
import { KtPlaceListFilterQueryDto } from './kt-place.dto';

@Controller('kt-place')
export class KtPlaceController {
  constructor(private readonly ktPlaceService: KtPlaceService) {}

  @Get()
  async getKtPlaces(@Query() query: KtPlaceListFilterQueryDto): Promise<[KtPlaceResponseDto[], number]> {
    const [places, count] = await this.ktPlaceService.getKtPlaces(query);
    return [places.map((place) => new KtPlaceResponseDto(place)), count];
  }

  @Get(':idx')
  async getKtPlace(@Param() param: PlaceIdxParamDto): Promise<KtPlaceResponseDto> {
    const place = await this.ktPlaceService.getKtPlaceAllInfo(param.idx);
    return new KtPlaceResponseDto(place);
  }

  // @Get('')
}
