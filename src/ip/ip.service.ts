import { Injectable } from '@nestjs/common';
import { IpRepository } from './ip.repository';

@Injectable()
export class IpService {
  constructor(private readonly ipRepository: IpRepository) {}

  async getIp(address: string) {
    return await this.ipRepository.getIp({ address });
  }
}
