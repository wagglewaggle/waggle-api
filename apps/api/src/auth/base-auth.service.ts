import { CallbackQueryDto } from './auth.type';
import * as format from 'string-format';

export abstract class BaseAuthService {
  abstract callback(query: CallbackQueryDto): Promise<any>;
  protected abstract getToken(code: string): Promise<Record<string, any>>;
  protected abstract getInformation(token: string, type: string): Promise<Record<string, any>>;

  generateRequestUrl(url: string, data?: Record<string, any>): string {
    return format(url, data);
  }
}
