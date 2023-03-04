import { HttpStatus, Injectable } from '@nestjs/common';
import { KtPlace } from '../../../../libs/entity/src/kt-place/kt-place.entity';
import { KtPopulationLevel } from '../../../../libs/entity/src/kt-population/kt-population.constant';
import { SktPlace } from '../../../../libs/entity/src/skt-place/skt-place.entity';
import { SktPopulationLevel } from '../../../../libs/entity/src/skt-population/skt-population.constant';
import ERROR_CODE from '../app/exceptions/error-code';
import { ClientRequestException } from '../app/exceptions/request.exception';
import { KtPlaceService } from '../kt-place/kt-place.service';
import { SktPlaceService } from '../skt-place/skt-place.service';
import { PlaceEntity } from './entity/place.entity';
import { PopulationLevel } from './place.constant';
import { PlaceListFilterQueryDto } from './place.dto';

@Injectable()
export class PlaceService {
  constructor(private readonly ktPlaceService: KtPlaceService, private readonly sktPlaceService: SktPlaceService) {}

  getRefinedPlaces(ktPlaces: KtPlace[], sktPlaces: SktPlace[], sortType = false) {
    const places: PlaceEntity[] = [];
    const ktLength = ktPlaces.length;
    const sktLength = sktPlaces.length;

    let ktIdx = 0,
      sktIdx = 0;

    while (ktIdx < ktLength && sktIdx < sktLength) {
      while (
        ktIdx < ktLength &&
        sktIdx < sktLength &&
        PlaceEntity.getPopulationLevel(ktPlaces[ktIdx].population.level) <=
          PlaceEntity.getPopulationLevel(undefined, sktPlaces[sktIdx].population.level)
      ) {
        if (sortType) {
          places.push(new PlaceEntity(sktPlaces[sktIdx++]));
        } else {
          places.push(new PlaceEntity(ktPlaces[ktIdx++]));
        }
      }

      while (
        ktIdx < ktLength &&
        sktIdx < sktLength &&
        PlaceEntity.getPopulationLevel(ktPlaces[ktIdx].population.level) >
          PlaceEntity.getPopulationLevel(undefined, sktPlaces[sktIdx].population.level)
      ) {
        if (sortType) {
          places.push(new PlaceEntity(ktPlaces[ktIdx++]));
        } else {
          places.push(new PlaceEntity(sktPlaces[sktIdx++]));
        }
      }
    }

    while (ktIdx < ktLength) places.push(new PlaceEntity(ktPlaces[ktIdx++]));
    while (sktIdx < sktLength) places.push(new PlaceEntity(sktPlaces[sktIdx++]));

    return places;
  }

  async getAllTypePlaces(query: PlaceListFilterQueryDto): Promise<PlaceEntity[]> {
    const [ktPlaces] = await this.ktPlaceService.getKtPlaces(query);
    const [sktPlaces] = await this.sktPlaceService.getSktPlaces(query);
    const places = this.getRefinedPlaces(ktPlaces, sktPlaces, query.populationSort);
    return places;
  }
}
