import { Controller, Get, Param, Query } from '@nestjs/common';
import { PlaceIdxParamDto } from '../app/app.dto';
import { SktPlaceListFilterQueryDto } from './skt-place.dto';
import { SktPlaceService } from './skt-place.service';

@Controller('skt-place')
export class SktPlaceController {
  constructor(private readonly sktPlaceService: SktPlaceService) {}

  @Get()
  async getSktPlaces(@Query() query: SktPlaceListFilterQueryDto) {
    const places = await this.sktPlaceService.getSktPlaces(query);
    return places;
  }

  @Get(':idx')
  async getSktPlace(@Param() param: PlaceIdxParamDto) {
    const place = await this.sktPlaceService.getSktPlaceAllInfo(param.idx);
    return place;
  }
}
