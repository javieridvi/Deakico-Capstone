import { Controller, Post, Body, Get, Param, Put, Delete } from "@nestjs/common";
import { Observable } from "rxjs";
import { DeleteResult, UpdateResult } from "typeorm";
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
    getAllReviews(): Observable<Review[]>{
        return this.reviewsService.getAllReviews();
    }

    @Get(':r_id')
    getReview(@Param('r_id') r_Id: number,):Observable<Review> {
        return this.reviewsService.getReview(r_Id);
    }

    @Put(':r_id')
    updateReview(
        @Param('r_id') r_Id: number,
        @Body() review: Review,
    ): Observable<UpdateResult> {
        return this.reviewsService.updateReview(r_Id, review);
    }

    @Delete(':r_id')
    deleteReview(
        @Param('r_id') r_Id: number,): Observable<DeleteResult> {
            return this.reviewsService.deleteReview(r_Id);
    }
}