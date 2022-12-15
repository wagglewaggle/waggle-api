import { Injectable } from '@nestjs/common';
import { SktPlace } from '@lib/entity/skt-place/skt-place.entity';
import { SktPlaceRepository } from './skt-place.repository';

@Injectable()
export class SktPlaceService {
  constructor(private readonly sktPlaceRepository: SktPlaceRepository) {}

  async getSktPlaces(): Promise<SktPlace[]> {
    return await this.sktPlaceRepository.getSktPlace();
  }

  async getSktPlace(idx: number): Promise<SktPlace | undefined> {
    const [place] = await this.sktPlaceRepository.getSktPlace({ idx });
    return place;
  }
}
