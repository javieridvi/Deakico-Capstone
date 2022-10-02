import { Injectable, NotFoundException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
import { Repository } from "typeorm";
import { FollowEntity } from "./follows.entity";
import { Follow } from "./follows.interface";

@Injectable()
export class FollowsService {
    constructor(
    @InjectRepository(FollowEntity)
    private readonly followRepository: Repository<FollowEntity>
    ) {}

    insertFollow(follow: Follow): Observable<Follow> { return from(this.followRepository.save(follow)); }

    getAllFollows() { return this.followRepository.find() }

    getFollow(f_id) { return this.followRepository.findOneBy(
        { f_id: f_id, }
    ) }  
    
}