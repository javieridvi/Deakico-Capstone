import { Injectable, NotFoundException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { FollowEntity } from "./follows.entity";
import { Follow } from "./follows.interface";

@Injectable()
export class FollowsService {
    constructor(
    @InjectRepository(FollowEntity)
    private readonly followRepository: Repository<FollowEntity>
    ) {}

    insertFollow(follow: Follow): Observable<Follow> { return from(this.followRepository.save(follow)); }

    getAllFollows(): Observable<Follow[]> { return from(this.followRepository.find()) }

    getFollow(f_id): Observable<Follow> { return from(this.followRepository.findOneBy(
        { f_id: f_id, }
    )) }  

    updateFollow(f_id: number, follow: Follow): Observable<UpdateResult> { 
        return from(this.followRepository.update(f_id, follow));
    }
    
    deleteFollow(f_id: number): Observable<DeleteResult> {
        return from(this.followRepository.delete(f_id))
    }
}