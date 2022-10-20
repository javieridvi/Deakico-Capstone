import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
import { UserAccount } from "src/UserAccount/users.interface";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { ReviewEntity } from "./reviews.entity";
import { Review } from "./reviews.interface";

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>
  ) { }

  getReview(r_id): Observable<Review> {
    return from(this.reviewRepository.findOneBy(
      { r_id: r_id, }
    ))
  }

  getItemReview(itemId: number): Observable<Review[]> {
    return from(this.reviewRepository.find({
      where: {
        i_id: itemId,
      }
    }));
  }

  getAllReviews(): Observable<Review[]> { return from(this.reviewRepository.find()) }

  insertReview(user: UserAccount, review: Review): Observable<Review> { 
    review.u_id = user.u_id;
    return from(this.reviewRepository.save(review)); 
  }

  updateReview(r_id: number, review: Review): Observable<UpdateResult> {
    return from(this.reviewRepository.update(r_id, review));
  }

  deleteReview(r_id: number): Observable<DeleteResult> {
    return from(this.reviewRepository.delete(r_id))
  }

}