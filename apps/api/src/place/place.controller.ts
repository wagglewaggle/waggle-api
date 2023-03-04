import { Controller, Get, Query } from '@nestjs/common';
import { IListResponse } from '../app/interfaces/common.interface';
import { PlaceResponseDto } from './dtos/place-response.dto';
import { ApiPath } from './place.constant';
import { PlaceListFilterQueryDto } from './place.dto';
import { PlaceService } from './place.service';

@Controller(ApiPath.Root)
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get()
  async getAllTypePlaces(@Query() query: PlaceListFilterQueryDto): Promise<IListResponse<PlaceResponseDto>> {
    const places = await this.placeService.getAllTypePlaces(query);
    return { list: places.map((place) => new PlaceResponseDto(place)) };
  }
}
