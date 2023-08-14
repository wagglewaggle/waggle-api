import { IRequestAugmented } from '../app.interface';

export class RequestExtras {
  private readonly TEST = 'hi';

  getTest(): string {
    return this.TEST;
  }
}
