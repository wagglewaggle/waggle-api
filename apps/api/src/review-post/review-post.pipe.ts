import { PipeTransform } from '@nestjs/common';

export class ReviewPostIdxPipe implements PipeTransform {
  transform(value: any) {
    value.reviewPostIdx = Number(value.reviewPostIdx);

    return value;
  }
}
