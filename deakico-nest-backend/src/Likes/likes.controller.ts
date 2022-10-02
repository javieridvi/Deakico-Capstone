import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { Observable } from "rxjs";
import { Likes } from "./likes.interface";
import { LikesService } from "./likes.service";

@Controller('likes')
export class LikesController {
    constructor(private readonly likesService: LikesService) {}

    @Post()
    insertLike(@Body() like: Likes): Observable<Likes> {
        return this.likesService.insertLike(like);
    }

    @Get()
    getAllLikes(){
        return this.likesService.getAllLikes();
    }

    @Get(':l_id')
    getLike(@Param('l_id') likeId: number,) {
        return this.likesService.getLike(likeId);
    }
}