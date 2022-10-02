import { Injectable, NotFoundException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
import { Repository } from "typeorm";
import { ReviewEntity } from "./reviews.entity";
import { Review } from "./reviews.interface";

@Injectable()
export class ReviewService {
    constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>
    ) {}

    insertReview(review: Review): Observable<Review> { return from(this.reviewRepository.save(review)); }

    getAllReviews() { return this.reviewRepository.find() }

    getReview(r_id) { return this.reviewRepository.findOneBy(
        { r_id: r_id, }
    ) }  
    
}