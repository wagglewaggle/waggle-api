import { Injectable } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { IncomingWebhook } from '@slack/webhook';
import { config } from '@lib/config';
import { JobType } from '../app.constant';

@Injectable()
export class SentryService {
  sendError(error, jobType: JobType) {
    Sentry.captureException(error);

    if (jobType === JobType.KT) {
      this.send(`Request Message: ${error.message}`, `Error: ${JSON.stringify(error)}`);
    } else {
      const errorPath = error.request.path;
      const errorDataMsg = JSON.stringify(error.response.data);
      this.send(`Request Message: ${error.message}`, `Error Url: ${errorPath}\n\nError Message : ${errorDataMsg}`);
    }
  }

  private send(title: string, value: string) {
    const webhook = new IncomingWebhook(config.SLACK_SENTRY_SCHEDULER_WEBHOOK);
    webhook.send({
      attachments: [
        {
          color: 'danger',
          text: '🚨wagglewaggle-scheduler 버그 발생🚨',
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
