import { Injectable, NotFoundException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
import { UserAccount } from "src/UserAccount/users.interface";
import { DatabaseType, DeleteResult, InsertQueryBuilder, InsertResult, Like, Repository, UpdateResult } from "typeorm";
import { LikeEntity } from "./likes.entity";
import { Likes } from "./likes.interface";

@Injectable()
export class LikesService {
    constructor(
    @InjectRepository(LikeEntity)
    private readonly likeRepository: Repository<LikeEntity>
    ) {}

    /**
     * Insertion service method to insert into Likes table in database.
     * @param {UserAccount} user the user that likes the item
     * @param {Likes} like Likes object to be saved to the database
     * @returns {Observable<Likes>} an observable Promise (a promise given representation).
     */
    insertLike(user: UserAccount, like: Likes): Observable<Likes> { 
        like.u_id = user.u_id;
        return from(this.likeRepository.save(like)); 
    }

    /**
     * 
     * @returns 
     */
    getAllLikes(): Observable<Likes[]> { return from(this.likeRepository.find()); }

    /**
     * 
     * @param l_id 
     * @returns 
     */
    getLike(l_id): Observable<Likes> { return from(this.likeRepository.findOneBy(
        { l_id: l_id, }
    )) }  

    /**
     * 
     * @param l_id 
     * @param like 
     * @returns 
     */
    updateLike(l_id: number, like: Likes): Observable<UpdateResult> { 
        return from(this.likeRepository.update(l_id, like));
    }
    
    /**
     * @param l_id 
     * @returns 
     */
    deleteLike(l_id: number): Observable<DeleteResult> {
        return from(this.likeRepository.delete(l_id))
    }
    
}