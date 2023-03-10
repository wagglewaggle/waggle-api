import { Controller, Get, Param, Query } from '@nestjs/common';
import { KtPlace } from '@lib/entity/kt-place/kt-place.entity';
import { SktPlace } from '@lib/entity/skt-place/skt-place.entity';
import { PlaceType } from '../app/app.constant';
import { IListResponse } from '../app/interfaces/common.interface';
import { KtPlaceResponseDto } from '../kt-place/dtos/kt-place-reponse.dto';
import { SktPlaceResponseDto } from '../skt-place/dtos/skt-place-response.dto';
import { PlaceResponseDto } from './dtos/place-response.dto';
import { ApiPath } from './place.constant';
import { PlaceListFilterQueryDto } from './place.dto';
import { PlaceService } from './place.service';
import { PlaceListFilterPipe } from './place.pipe';
import { PlaceParamDto } from '../app/app.dto';

@Controller(ApiPath.Root)
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get()
  async getAllTypePlaces(@Query(PlaceListFilterPipe) query: PlaceListFilterQueryDto): Promise<IListResponse<PlaceResponseDto>> {
    const places = await this.placeService.getAllTypePlaces(query);
    return { list: places.map((place) => new PlaceResponseDto(place)) };
  }

  @Get(`${ApiPath.GetPlaceType}/${ApiPath.GetPlaceIdx}`)
  async getPlace(@Param() param: PlaceParamDto) {
    const { idx, type } = param;
    const result = await this.placeService.getPlaceAllInfo(idx, type);

    if (type === PlaceType.Kt) {
      return new KtPlaceResponseDto(result.getInstancePlaceType() as KtPlace);
    } else if (type === PlaceType.Skt) {
      return new SktPlaceResponseDto(result.getInstancePlaceType() as SktPlace);
    }
  }
}
