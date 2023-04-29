import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { IpService } from '../../ip/ip.service';
import ERROR_CODE from '../exceptions/error-code';
import { ClientRequestException } from '../exceptions/request.exception';
import { IpStatus } from 'waggle-entity/dist/ip/ip.constant';

@Injectable()
export class IpGuard implements CanActivate {
  constructor(private readonly ipService: IpService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    const ipExist = await this.ipService.getIp(req.ip);
    if (!ipExist) {
      throw new ClientRequestException(ERROR_CODE.ERR_0000006, HttpStatus.FORBIDDEN);
    }
    if (ipExist.status !== IpStatus.Activated) {
      throw new ClientRequestException(ERROR_CODE.ERR_0000006, HttpStatus.FORBIDDEN);
    }

    return true;
  }
}
