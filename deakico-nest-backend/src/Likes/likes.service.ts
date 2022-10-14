import { Injectable, NotFoundException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
import { DatabaseType, DeleteResult, InsertQueryBuilder, InsertResult, Like, Repository, UpdateResult } from "typeorm";
import { LikeEntity } from "./likes.entity";
import { Likes } from "./likes.interface";

@Injectable()
export class LikesService {
    constructor(
    @InjectRepository(LikeEntity)
    private readonly likeRepository: Repository<LikeEntity>
    ) {}

    insertLike(like: Likes): Observable<Likes> { return from(this.likeRepository.save(like)); }

    getAllLikes(): Observable<Likes[]> { return from(this.likeRepository.find()); }

    getLike(l_id): Observable<Likes> { return from(this.likeRepository.findOneBy(
        { l_id: l_id, }
    )) }  

    updateLike(l_id: number, like: Likes): Observable<UpdateResult> { 
        return from(this.likeRepository.update(l_id, like));
    }
    
    deleteLike(l_id: number): Observable<DeleteResult> {
        return from(this.likeRepository.delete(l_id))
    }
    
}