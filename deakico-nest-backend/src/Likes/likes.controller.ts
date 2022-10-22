import { Request, Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from "@nestjs/common";
import { get } from "http";
import { Observable } from "rxjs";
import { JwtGuard } from "src/UserAccount/auth/guards/jwt.guard";
import { DeleteResult, UpdateResult } from "typeorm";
import { Likes } from "./likes.interface";
import { LikesService } from "./likes.service";

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) { }

  @Get()
  getAllLikes(): Observable<Likes[]> {
    return this.likesService.getAllLikes();
  }

  @Get(':l_id')
  getLike(@Param('l_id') likeId: number,): Observable<Likes> {
    return this.likesService.getLike(likeId);
  }

  /**
   * Fetches user id and the items liked by given user id
   * @param userId the id of the user
   * @returns {Observable<Likes[]>} an observable promise
   */
  @Get('user/:u_id')
  getUserLiked(@Param('u_id') userId: number,): Observable<Likes[]> {
    return this.likesService.getUserLiked(userId);
  }
  
  /**
   * Fetches the amount(int) of likes of said item
   * @param itemId id of the item 
   * @returns {Promise<number>} Count of given i_id in likes
   */
  @Get('item/:i_id')
  getItemLikes(@Param('i_id') itemId: number,): Promise<number> {
    return this.likesService.getItemLikes(itemId);
  }

  @UseGuards(JwtGuard) //requires user login token authentification
  @Post()
  insertLike(@Body() like: Likes, @Request() req): Observable<Likes> {
    return this.likesService.insertLike(req.user, like);
  }

  @Put(':l_id')
  updateLike(
    @Param('l_id') likeId: number,
    @Body() like: Likes,
  ): Observable<UpdateResult> {
    return this.likesService.updateLike(likeId, like);
  }

  @Delete(':l_id')
  deleteItem(
    @Param('l_id') likeId: number,): Observable<DeleteResult> {
    return this.likesService.deleteLike(likeId);
  }
}