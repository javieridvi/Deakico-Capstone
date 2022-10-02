import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { Observable } from "rxjs";
import { Review } from "./reviews.interface";
import { ReviewService } from "./reviews.service";

@Controller('reviews')
export class ReviewController {
    constructor(private readonly reviewsService: ReviewService) {}

    @Post()
    insertReview(@Body() review: Review): Observable<Review> {
        return this.reviewsService.insertReview(review);
    }

    @Get()
    getAllReviews(){
        return this.reviewsService.getAllReviews();
    }

    @Get(':r_id')
    getReview(@Param('r_id') r_Id: number,) {
        return this.reviewsService.getReview(r_Id);
    }
}