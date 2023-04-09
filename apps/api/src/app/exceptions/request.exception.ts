import { HttpException, HttpStatus } from '@nestjs/common';

export class ClientRequestException extends HttpException {
  readonly value: Record<string, any>;

  constructor(response: string | Record<string, any>, statusCode: HttpStatus, value?: any) {
    super(response, statusCode);
    this.value = value;
  }
}
