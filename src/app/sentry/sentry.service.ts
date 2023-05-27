import { Injectable } from '@nestjs/common';
import { IncomingWebhook } from '@slack/webhook';
import * as Sentry from '@sentry/node';
import { config } from '../config/config.service';

@Injectable()
export class SentryService {
  sendError(e, stack = '') {
    Sentry.captureException(e);

    this.send(e.message, stack);
  }

  private send(title: string, value = '') {
    const webhook = new IncomingWebhook(config.slackApiServer);
    webhook.send({
      attachments: [
        {
          color: 'danger',
          text: `🚨API server 버그 발생🚨`,
          fields: [
            {
              title,
              value,
              short: false,
            },
          ],
          ts: Math.floor(new Date().getTime() / 1000).toString(),
        },
      ],
    });
  }
}
