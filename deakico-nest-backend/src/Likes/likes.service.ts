import { Injectable, NotFoundException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
import { Repository } from "typeorm";
import { LikeEntity } from "./likes.entity";
import { Likes } from "./likes.interface";

@Injectable()
export class LikesService {
    constructor(
    @InjectRepository(LikeEntity)
    private readonly likeRepository: Repository<LikeEntity>
    ) {}

    insertLike(like: Likes): Observable<Likes> { return from(this.likeRepository.save(like)); }

    getAllLikes() { return this.likeRepository.find() }

    getLike(l_id) { return this.likeRepository.findOneBy(
        { l_id: l_id, }
    ) }  
    
}