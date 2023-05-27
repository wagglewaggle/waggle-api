import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ReplyIdxPipe implements PipeTransform {
  transform(value: any) {
    value.replyIdx = Number(value.replyIdx);
    return value;
  }
}
