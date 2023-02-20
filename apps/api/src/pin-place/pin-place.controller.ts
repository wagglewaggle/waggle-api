import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { IRequestAugmented } from '../app/app.interface';
import { UserGuard } from '../app/guards/user.guard';
import { PinPlaceResponseDto } from './dtos/pin-place-response.dto';
import { ApiPath } from './pin-place.constant';
import { AddPinPlaceBodyDto, DeletePinPlaceBodyDto } from './pin-place.dto';
import { PinPlaceService } from './pin-place.service';

@Controller(ApiPath.Root)
@UseGuards(UserGuard)
export class PinPlaceController {
  constructor(private readonly pinPlaceService: PinPlaceService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addPinPlace(@Req() req: IRequestAugmented, @Body() body: AddPinPlaceBodyDto) {
    const user = req.extras.getUser();
    await this.pinPlaceService.addPinPlace(user, body);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getPinPlaces(@Req() req: IRequestAugmented): Promise<PinPlaceResponseDto> {
    const user = req.extras.getUser();
    const result = await this.pinPlaceService.getPinPlacesByUser(user);
    const sktPlaces = result.filter(({ sktPlace }) => sktPlace !== null).map(({ sktPlace }) => sktPlace);
    const ktPlaces = result.filter(({ ktPlace }) => ktPlace !== null).map(({ ktPlace }) => ktPlace);
    return new PinPlaceResponseDto(sktPlaces, ktPlaces);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async deletePinPlace(@Req() req: IRequestAugmented, @Body() body: DeletePinPlaceBodyDto) {
    const user = req.extras.getUser();
    const pinPlace = await this.pinPlaceService.getPinPlaceByUserAndIdx(user, body.idx);
    await this.pinPlaceService.deletePinPlace(pinPlace);
  }
}
