import { Injectable } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { IncomingWebhook } from '@slack/webhook';
import { config } from '@lib/config';
import { JobType } from '../app.constant';
import { ISentryError } from './sentry.constant';

@Injectable()
export class SentryService {
  sendError(e: ISentryError, jobType: JobType) {
    Sentry.captureException(e);

    const { error, place } = e;

    if (jobType === JobType.KT) {
      this.send(jobType, `Request Message: ${error.message}`, `Error Place: ${JSON.stringify(place)}\n\nError: ${JSON.stringify(error)}`);
    } else {
      const errorPath = error.request.path;
      const errorDataMsg = JSON.stringify(error.response.data);
      this.send(
        jobType,
        `Request Message: ${error.message}`,
        `Error Place: ${JSON.stringify(place)}\n\nError Path: ${errorPath}\n\nError Message : ${errorDataMsg}`,
      );
    }
  }

  private send(jobType: JobType, title: string, value: string) {
    const webhook = new IncomingWebhook(config.slackApiServer);
    webhook.send({
      attachments: [
        {
          color: 'danger',
          text: `🚨${jobType} Job 버그 발생🚨`,
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
