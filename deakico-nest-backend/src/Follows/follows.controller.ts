import { Controller, Post, Body, Get, Param, Put, Delete } from "@nestjs/common";
import { Observable } from "rxjs";
import { DeleteResult, UpdateResult } from "typeorm";
import { Follow } from "./follows.interface";
import { FollowsService } from "./follows.service";

@Controller('follows')
export class FollowsController {
    constructor(private readonly followsService: FollowsService) {}

    @Post()
    insertFollow(@Body() follow: Follow): Observable<Follow> {
        return this.followsService.insertFollow(follow);
    }

    @Get()
    getAllFollows(): Observable<Follow[]>{
        return this.followsService.getAllFollows();
    }

    @Get(':f_id')
    getFollow(@Param('f_id') followId: number,) {
        return this.followsService.getFollow(followId);
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