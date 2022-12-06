import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { UserAccount } from '../UserAccount/users.interface';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ReviewEntity } from './reviews.entity';
import { Review } from './reviews.interface';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
  ) {}

  getReview(r_id): Observable<Review> {
    return from(this.reviewRepository.findOneBy({ r_id: r_id, disabled: false}));
  }

  async getProviderReviews(paID: number): Promise<Review[]> {
    const result = await this.reviewRepository
    .createQueryBuilder('review')
    .leftJoin('review.item', 'items', 'items.i_id = review.i_id')
    .select('review')
    .addSelect('items')
    .where('items.pa_id = :pa_id', {pa_id: paID})
    .andWhere('review.disabled = false')
    .getRawMany()
    return result;
  }

  getItemReview(itemId: number): Observable<Review[]> {
    return from(
      this.reviewRepository.find({
        where: {
          i_id: itemId,
          disabled: false,
        },
      }),
    );
  }

  getAllReviews(): Observable<Review[]> {
    return from(this.reviewRepository.find());
  }

  insertReview(user: UserAccount, review: Review): Observable<Review> {
    review.u_id = user.u_id;
    return from(this.reviewRepository.save(review));
  }

  updateReview(r_id: number, review: Review): Observable<UpdateResult> {
    return from(this.reviewRepository.update(r_id, review));
  }

  async deleteReview(
    reviewId: number,
    userId: number,
  ): Promise<Observable<UpdateResult>> {
    //check if request exists and belongs to user
    await this.reviewRepository.findOneOrFail({
      select: { r_id: true },
      where: { r_id: reviewId, u_id: userId },
    });
    return from(this.reviewRepository.update(reviewId, {disabled: true}));
  }
}
