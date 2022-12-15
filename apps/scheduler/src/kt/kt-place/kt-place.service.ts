import { Injectable } from '@nestjs/common';
import { KtPlace } from '@lib/entity/kt-place/kt-place.entity';
import { KtPlaceRepository } from './kt-place.repository';

@Injectable()
export class KtPlaceService {
  constructor(private readonly ktPlaceRepository: KtPlaceRepository) {}

  async getKtPlaces(): Promise<KtPlace[]> {
    return await this.ktPlaceRepository.getKtPlace();
  }

  async getKtPlace(idx: number): Promise<KtPlace | undefined> {
    const [place] = await this.ktPlaceRepository.getKtPlace({ idx });
    return place;
  }
}
