import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, EntityManager, FindOptionsWhere, Repository } from 'typeorm';
import { PinReviewPost } from 'waggle-entity/dist/pin-review-post/pin-review-post.entity';
import { UserEntity } from '../user/entity/user.entity';

@Injectable()
export class PinReviewPostRepository {
  constructor(@InjectRepository(PinReviewPost) private readonly repository: Repository<PinReviewPost>) {}

  createQueryBuilder(alias = 'pinReviewPost') {
    return this.repository.createQueryBuilder(alias);
  }

  createInstance(pinReviewPost: DeepPartial<PinReviewPost>): PinReviewPost {
    return this.repository.create(pinReviewPost);
  }

  async addPinReviewPost(pinReviewPost: PinReviewPost, manager?: EntityManager) {
    if (manager) {
      return manager.save(PinReviewPost, pinReviewPost);
    }
    return this.repository.save(pinReviewPost);
  }

  async getPinReviewPost(where: FindOptionsWhere<PinReviewPost>, relations?: string[]): Promise<PinReviewPost | undefined> {
    const options: any = { where };
    if (Array.isArray(relations)) {
      options.relations = relations;
    }
    const result = await this.repository.findOne(options);
    return result || undefined;
  }

  async deletePinReviewPost(pinReviewPost: PinReviewPost, manager?: EntityManager) {
    if (manager) {
      return manager.remove(PinReviewPost, pinReviewPost);
    }
    return this.repository.remove(pinReviewPost);
  }

  async getPinReviewPosts(user: UserEntity): Promise<[PinReviewPost[], number]> {
    const queryBuilder = this.createQueryBuilder()
      .leftJoinAndSelect('pinReviewPost.reviewPost', 'reviewPost')
      .leftJoinAndSelect('pinReviewPost.user', 'user')
      .leftJoinAndSelect('reviewPost.replies', 'reply')
      .leftJoinAndSelect('reviewPost.pinReviewPosts', 'prr')
      .leftJoinAndSelect('reviewPost.user', 'writer')
      .leftJoinAndSelect('reviewPost.sktPlace', 'sktPlace')
      .leftJoinAndSelect('reviewPost.ktPlace', 'ktPlace')
      .leftJoinAndSelect('reviewPost.extraPlace', 'extraPlace')
      .where('user.idx = :userIdx', { userIdx: user.idx })
      .orderBy('pinReviewPost.createdDate', 'DESC');

    return await queryBuilder.getManyAndCount();
  }
}
