import { Controller, Get, Param, Query } from '@nestjs/common';
import { PlaceIdxParamDto } from '../app/app.dto';
import { IListCountResponse } from '../app/interfaces/common.interface';
import { PlaceListFilterQueryDto } from '../place/place.dto';
import { SktPlaceResponseDto } from './dtos/skt-place-response.dto';
import { SktPlaceListFilterQueryDto } from './skt-place.dto';
import { SktPlaceService } from './skt-place.service';

@Controller('skt-place')
export class SktPlaceController {
  constructor(private readonly sktPlaceService: SktPlaceService) {}

  @Get()
  async getSktPlaces(@Query() query: PlaceListFilterQueryDto): Promise<IListCountResponse<SktPlaceResponseDto>> {
    const [places, count] = await this.sktPlaceService.getSktPlaces(query);
    return { list: places.map((place) => new SktPlaceResponseDto(place)), count };
  }

  @Get(':idx')
  async getSktPlace(@Param() param: PlaceIdxParamDto): Promise<SktPlaceResponseDto> {
    const result = await this.sktPlaceService.getSktPlaceAllInfo(param.idx);
    if (Array.isArray(result)) {
      const [place, location] = result;
      return new SktPlaceResponseDto(place, location);
    }
    return new SktPlaceResponseDto(result);
  }
}
