import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { Observable } from "rxjs";
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
    getAllFollows(){
        return this.followsService.getAllFollows();
    }

    @Get(':f_id')
    getFollow(@Param('f_id') followId: number,) {
        return this.followsService.getFollow(followId);
    }
}