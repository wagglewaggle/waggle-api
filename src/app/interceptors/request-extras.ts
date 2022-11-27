import { IRequestAugmented, IRequestLocation } from '../app.interface';

export class RequestExtras {
  private readonly TEST = 'hi';

  constructor(req: IRequestAugmented) {}

  getTest(): string {
    return this.TEST;
  }
}
