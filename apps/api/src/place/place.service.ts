import { Injectable } from '@nestjs/common';
import { PlaceType } from '../app/app.constant';
import { KtPlaceService } from '../kt-place/kt-place.service';
import { SktPlaceService } from '../skt-place/skt-place.service';
import { PlaceEntity } from './entity/place.entity';
import { PlaceListFilterQueryDto } from './place.dto';

@Injectable()
export class PlaceService {
  constructor(private readonly ktPlaceService: KtPlaceService, private readonly sktPlaceService: SktPlaceService) {}

  async getAllTypePlaces(query: PlaceListFilterQueryDto): Promise<PlaceEntity[]> {
    const [ktPlaces] = await this.ktPlaceService.getKtPlaces(query);
    const [sktPlaces] = await this.sktPlaceService.getSktPlaces(query);
    return PlaceEntity.getRefinedPlaces(ktPlaces, sktPlaces, query.populationSort);
  }

  async getPlaceAllInfo(idx: number, type: PlaceType) {
    if (type === PlaceType.Kt) {
      return await this.ktPlaceService.getKtPlaceAllInfo(idx);
    } else if (type === PlaceType.Skt) {
      return await this.sktPlaceService.getSktPlaceAllInfo(idx);
    }
  }
}
