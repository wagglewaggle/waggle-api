import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ListFilterPipe implements PipeTransform {
  transform(value: any) {
    if (value.limit) {
      value.limit = Number(value.limit);
    }

    if (value.offset) {
      value.offset = Number(value.offset);
    }

    return value;
  }
}

@Injectable()
export class PlaceParamPipe implements PipeTransform {
  transform(value: any) {
    value.idx = Number(value.idx);

    return value;
  }
}
