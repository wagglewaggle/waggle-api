import { Injectable } from '@nestjs/common';
import { ReviewPostReport } from 'waggle-entity/dist/review-post-report/review-post-report.entity';
import { ReviewPostEntity } from '../review-post/entity/review-post.entity';
import { UserEntity } from '../user/entity/user.entity';
import { ReviewPostReportRepository } from './review-post-report.repository';
import { EntityManager } from 'typeorm';

@Injectable()
export class ReviewPostReportService {
  constructor(private readonly reviewPostReportRepository: ReviewPostReportRepository) {}

  async addReviewPostReport(user: UserEntity, reviewPostEntity: ReviewPostEntity, manager?: EntityManager) {
    const reviewPostReport = this.reviewPostReportRepository.createInstance(user, reviewPostEntity);
    await this.reviewPostReportRepository.addReviewPostReport(reviewPostReport, manager);
  }

  async getReviewPostReport(reviewPost: ReviewPostEntity): Promise<ReviewPostReport[]> {
    return await this.reviewPostReportRepository.getReviewPostReport(reviewPost);
  }
}
