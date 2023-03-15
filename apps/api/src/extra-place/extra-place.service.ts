import { HttpStatus, Injectable } from '@nestjs/common';
import { ExtraPlace } from '@lib/entity/extra-place/extra-place.entity';
import ERROR_CODE from '../app/exceptions/error-code';
import { ClientRequestException } from '../app/exceptions/request.exception';
import { ExtraPlaceRepository } from './extra-place.repository';
import { PlaceListFilterQueryDto } from '../place/place.dto';

@Injectable()
export class ExtraPlaceService {
  constructor(private readonly extraPlaceRepository: ExtraPlaceRepository) {}

  async getPlaces(query: PlaceListFilterQueryDto): Promise<[ExtraPlace[], number]> {
    return await this.extraPlaceRepository.getPlaces(query);
  }

  async getPlaceByIdx(idx: number, relations?: string[]): Promise<ExtraPlace> {
    const place = await this.extraPlaceRepository.getPlace({ idx }, relations);
    if (!place) {
      throw new ClientRequestException(ERROR_CODE.ERR_0002001, HttpStatus.BAD_REQUEST);
    }
    return place;
  }

  async getPlaceAllInfo(idx: number): Promise<ExtraPlace> {
    return this.getPlaceByIdx(idx, [
      'pinPlaces',
      'reviewPosts',
      'location',
      'location.ktPlaces',
      'location.ktPlaces.population',
      'location.ktPlaces.categories',
      'location.ktPlaces.cctvs',
      'location.ktPlaces.pinPlaces',
      'location.ktPlaces.reviewPosts',
      'location.sktPlaces',
      'location.sktPlaces.population',
      'location.sktPlaces.categories',
      'location.sktPlaces.pinPlaces',
      'location.sktPlaces.reviewPosts',
      'location.extraPlaces',
      'location.extraPlaces.categories',
      'location.extraPlaces.pinPlaces',
      'location.extraPlaces.reviewPosts',
    ]);
  }
}
