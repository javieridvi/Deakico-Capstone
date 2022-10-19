import { Controller, Post, Body, Get, Param, Put, Delete } from "@nestjs/common";
import { Observable } from "rxjs";
import { DeleteResult, UpdateResult } from "typeorm";
import { Follow } from "./follows.interface";
import { FollowsService } from "./follows.service";

@Controller('follows')
export class FollowsController {
  constructor(private readonly followsService: FollowsService) { }

  @Get()
  getAllFollows(): Observable<Follow[]> {
    return this.followsService.getAllFollows();
  }

  @Get(':f_id')
  getFollow(@Param('f_id') followId: number,) {
    return this.followsService.getFollow(followId);
  }

  /**
   * Fetches count (int) of given providerId followers
   * @param providerId int pa_id id of provider
   * @returns int count of followers
   */
  @Get('followers/:pa_id')
  getFollowersCount(@Param('pa_id') providerId: number,) {
    return this.followsService.getFollowersCount(providerId);
  }

  /**
   * Fetches all user that are followers of given provider id
   * @param providerId int pa_id id of provider
   * @returns all user id that are followers of given provider
   */
  @Get('followers/user/:pa_id')
  getFollowers(@Param('pa_id') providerId: number,) {
    return this.followsService.getFollowers(providerId);
  }

  /**
   * Fetches count (int) of given user following providers
   * @param userId int u_id id of user
   * @returns int count of following
   */
  @Get('following/:u_id')
  getFollowingCount(@Param('u_id') userId: number,) {
    return this.followsService.getFollowingCount(userId);
  }

  /**
   * Fetches count (int) of given user following providers
   * @param userId int u_id id of user
   * @returns all providers ids given user is following
   */
  @Get('following/provider/:u_id')
  getFollowing(@Param('u_id') userId: number,) {
    return this.followsService.getFollowing(userId);
  }

  @Post()
  insertFollow(@Body() follow: Follow): Observable<Follow> {
    return this.followsService.insertFollow(follow);
  }

  @Put(':f_id')
  updateFollow(
    @Param('f_id') followId: number,
    @Body() follow: Follow,
  ): Observable<UpdateResult> {
    return this.followsService.updateFollow(followId, follow);
  }

  @Delete(':f_id')
  deleteItem(
    @Param('f_id') followId: number,): Observable<DeleteResult> {
    return this.followsService.deleteFollow(followId);
  }
}