import { Injectable } from '@nestjs/common';
import { IncomingWebhook } from '@slack/webhook';
import { config } from '@lib/config';
import { replyReportForm, reviewPostReportForm } from './slack.constant';
import { PlaceEntity } from '../../place/entity/place.entity';
import { ReviewPost } from 'waggle-entity/dist/review-post/review-post.entity';
import { Reply } from 'waggle-entity/dist/reply/reply.entity';

@Injectable()
export class SlackService {
  private send(channel: string, message: Record<string, any>) {
    const webhook = new IncomingWebhook(channel);
    webhook.send(message);
  }

  reportReviewPost(reviewPost: ReviewPost) {
    const place = new PlaceEntity(reviewPost.ktPlace || reviewPost.sktPlace || reviewPost.extraPlace);
    const message = reviewPostReportForm(reviewPost.user.nickname, reviewPost.idx, place);
    this.send(config.slackReport, message);
  }

  reportReply(reply: Reply) {
    const place = new PlaceEntity(reply.reviewPost.ktPlace || reply.reviewPost.sktPlace || reply.reviewPost.extraPlace);
    const message = replyReportForm(reply.user.nickname, reply.reviewPost.idx, reply.idx, reply.content, place);
    this.send(config.slackReport, message);
  }
}
