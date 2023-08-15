import { HttpException, HttpStatus } from '@nestjs/common';

export class ClientRequestException extends HttpException {
  readonly value: Record<string, any>;

  constructor(response: string | Record<string, any>, statusCode = HttpStatus.BAD_REQUEST, value: Record<string, any> = {}) {
    super(response, statusCode);
    this.value = value;
  }
}
