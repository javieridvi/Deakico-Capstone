import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtGuard } from '../UserAccount/auth/guards/jwt.guard';
import { DeleteResult } from 'typeorm';
import { Likes } from './likes.interface';
import { LikesService } from './likes.service';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Get()
  getAllLikes(): Observable<Likes[]> {
    return this.likesService.getAllLikes();
  }

  /**
   * Fetches user id and the items liked by given user id
   * @param req token request used to retrieve the id of the user
   * @returns {Observable<Likes[]>} an observable promise
   */
  @UseGuards(JwtGuard)
  @Get('user')
  getUserLiked(@Request() req: any): Promise<Partial<Likes[]>> {
    return this.likesService.getUserLiked(req.user.u_id);
  }

  /**
   * Fetches the amount(int) of likes of said item
   * @param itemId id of the item
   * @returns {Promise<number>} Count of given i_id in likes
   */
  @Get('item/:i_id')
  getItemLikes(@Param('i_id') itemId: number): Promise<number> {
    return this.likesService.getItemLikes(itemId);
  }

  @UseGuards(JwtGuard) //requires user login token authentification
  @Post()
  insertLike(@Body() like: Likes, @Request() req: any): Observable<Likes> {
    return this.likesService.insertLike(req.user, like);
  }

  @UseGuards(JwtGuard)
  @Delete()
  deleteItem(
    @Body() like: Likes,
    @Request() req: any,
  ): Observable<DeleteResult> {
    return this.likesService.deleteLike(req.user.u_id, like.i_id);
  }
}
