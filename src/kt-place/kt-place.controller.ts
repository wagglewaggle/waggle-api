import { Controller, Get, Param, Query } from '@nestjs/common';
import { KtPlaceService } from './kt-place.service';
import { KtPlaceResponseDto } from './dtos/kt-place-reponse.dto';
import { PlaceIdxParamDto } from '../app/app.dto';
import { KtPlaceListFilterQueryDto } from './kt-place.dto';
import { IListCountResponse } from '../app/interfaces/common.interface';
import { ApiPath } from './kt-place.constant';

@Controller(ApiPath.Root)
export class KtPlaceController {
  constructor(private readonly ktPlaceService: KtPlaceService) {}

  @Get()
  async getKtPlaces(@Query() query: KtPlaceListFilterQueryDto): Promise<IListCountResponse<KtPlaceResponseDto>> {
    const [places, count] = await this.ktPlaceService.getActivatedKtPlaces(query);
    return { list: places.map((place) => new KtPlaceResponseDto(place)), count };
  }

  @Get(ApiPath.GetPlaceIdx)
  async getKtPlace(@Param() param: PlaceIdxParamDto): Promise<KtPlaceResponseDto> {
    const result = await this.ktPlaceService.getKtPlaceAllInfo(param.idx);
    if (Array.isArray(result)) {
      const [place, location] = result;
      return new KtPlaceResponseDto(place, location);
    }
    return new KtPlaceResponseDto(result);
  }
}
