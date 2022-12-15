import { HttpException, HttpStatus } from '@nestjs/common';

export class ClientRequestException extends HttpException {
  readonly value: Record<string, any>;

  constructor(response: string | Record<string, any>, statusCode = HttpStatus.BAD_REQUEST, value: Record<string, any> = {}) {
    super(response, statusCode);
    this.value = value;
  }

  static parseFailedErrorMessage(message: string): string[] {
    // 실패메세지:실패횟수:최대실패횟수
    return message.split(':').slice(1);
  }
}
