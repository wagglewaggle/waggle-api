import { InjectRepository } from '@nestjs/typeorm';
import { Entity, EntityManager, Repository } from 'typeorm';
import { ReviewPostReport } from 'waggle-entity/dist/review-post-report/review-post-report.entity';
import { UserEntity } from '../user/entity/user.entity';
import { ReviewPostEntity } from '../review-post/entity/review-post.entity';

@Entity()
export class ReviewPostReportRepository {
  constructor(@InjectRepository(ReviewPostReport) private readonly repository: Repository<ReviewPostReport>) {}

  createInstance(user: UserEntity, reviewPost: ReviewPostEntity) {
    return this.repository.create({ user, reviewPost });
  }

  createQueryBuilder(alias = 'reviewPostReport') {
    return this.repository.createQueryBuilder(alias);
  }

  async addReviewPostReport(reviewPostReport: ReviewPostReport, manager?: EntityManager) {
    if (manager) {
      return manager.save(ReviewPostReport, reviewPostReport);
    }
    return this.repository.save(reviewPostReport);
  }

  async getReviewPostReport(reviewPost: ReviewPostEntity) {
    const queryBuilder = this.createQueryBuilder()
      .leftJoinAndSelect('reviewPostReport.user', 'user')
      .leftJoin('reviewPostReport.reviewPost', 'reviewPost')
      .where('reviewPostReport.reviewPostIdx = :reviewPostIdx', { reviewPostIdx: reviewPost.idx });

    return queryBuilder.getMany();
  }
}
