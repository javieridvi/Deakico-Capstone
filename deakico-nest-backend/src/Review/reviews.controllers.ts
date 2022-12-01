import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtGuard } from '../UserAccount/auth/guards/jwt.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Review } from './reviews.interface';
import { ReviewService } from './reviews.service';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewsService: ReviewService) {}

  @Get()
  getAllReviews(): Observable<Review[]> {
    return this.reviewsService.getAllReviews();
  }

 @UseGuards(JwtGuard)
  @Get('provider')
  getProviderReviews(@Request() req: any): Promise<Review[]> {
    return this.reviewsService.getProviderReviews(req.user.pa_id);
  }

  @Get(':r_id')
  getReview(@Param('r_id') r_Id: number): Observable<Review> {
    return this.reviewsService.getReview(r_Id);
  }

  /**
   * Fetches all reviews of given item
   * @param itemId int id of item
   * @returns list of reviews
   */
  @Get('item/:i_id')
  getItemReview(@Param('i_id') itemId: number) {
    return this.reviewsService.getItemReview(itemId);
  }

  @UseGuards(JwtGuard)
  @Post()
  insertReview(
    @Body() review: Review,
    @Request() req: any,
  ): Observable<Review> {
    return this.reviewsService.insertReview(req.user, review);
  }

  @UseGuards(JwtGuard)
  @Put(':r_id')
  updateReview(
    @Param('r_id') r_Id: number,
    @Body() review: Review,
    @Request() req: any,
  ): Observable<UpdateResult> {
    review.u_id = req.user.u_id;
    return this.reviewsService.updateReview(r_Id, review);
  }

  @UseGuards(JwtGuard)
  @Delete(':r_id')
  deleteReview(
    @Param('r_id') r_Id: number,
    @Request() req: any,
  ): Promise<Observable<DeleteResult>> {
    return this.reviewsService.deleteReview(r_Id, req.user.u_id);
  }
}
