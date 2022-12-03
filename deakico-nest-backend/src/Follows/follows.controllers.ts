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
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtGuard } from '../UserAccount/auth/guards/jwt.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Follow } from './follows.interface';
import { FollowsService } from './follows.service';

@Controller('follows')
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @Get()
  getAllFollows(): Observable<Follow[]> {
    return this.followsService.getAllFollows();
  }

  /**
   * Fetches all user that are followers of given provider id
   * @param req is user to retrived user account and pa_id
   * @returns all user id that are followers of given provider
   */
  @UseGuards(JwtGuard)
  @Get('followers')
  getFollowers(@Request() req: any) {
    return this.followsService.getFollowers(req.user.pa_id);
  }

  /**
   * Fetches count (int) of given providerId followers
   * @param req is user to retrived user account and pa_id
   * @returns int count of followers
   */
  @UseGuards(JwtGuard)
  @Get('followers/count')
  getFollowersCount(@Request() req: any) {
    return this.followsService.getFollowersCount(req.user.pa_id);
  }

  /**
   * Fetches count (int) of given user following providers
   * @param req is user to retrived user account and u_id
   * @returns all providers ids given user is following
   */
  @UseGuards(JwtGuard)
  @Get('following')
  getFollowing(@Request() req: any) {
    return this.followsService.getFollowing(req.user.u_id);
  }

  /**
   * Fetches count (int) of given user following providers
   * @param req is user to retrived user account and u_id
   * @returns int count of following
   */
  @UseGuards(JwtGuard)
  @Get('following/count')
  getFollowingCount(@Request() req: any) {
    return this.followsService.getFollowingCount(req.user.u_id);
  }

  @UseGuards(JwtGuard)
  @Post()
  insertFollow(
    @Body() follow: Follow,
    @Request() req: any,
  ): Observable<Follow> {
    try {
      return this.followsService.insertFollow(req.user, follow);
    } catch (error) {
      console.error(error);
      throw new HttpException("Forbidden", HttpStatus.FORBIDDEN, {cause: error});
      
    } 
  }

  @UseGuards(JwtGuard)
  @Delete()
  deleteFollow(
    @Body() follow: Follow,
    @Request() req: any,
  ): Observable<DeleteResult> {
    return this.followsService.deleteFollow(req.user.u_id, follow);
  }
}
