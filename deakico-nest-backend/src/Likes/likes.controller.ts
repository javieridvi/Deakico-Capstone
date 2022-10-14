import { Controller, Post, Body, Get, Param, Put, Delete } from "@nestjs/common";
import { Observable } from "rxjs";
import { DeleteResult, InsertQueryBuilder, InsertResult, UpdateResult } from "typeorm";
import { LikeEntity } from "./likes.entity";
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
    getAllLikes(): Observable<Likes[]>{
        return this.likesService.getAllLikes();
    }

    @Get(':l_id')
    getLike(@Param('l_id') likeId: number,): Observable<Likes> {
        return this.likesService.getLike(likeId);
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