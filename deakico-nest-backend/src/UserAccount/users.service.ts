import { Injectable, NotFoundException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
import { Repository } from "typeorm";
import { UserAccountEntity } from "./users.entity";
import { UserAccount } from "./users.interface";

@Injectable()
export class UserAccountService {
    constructor(
    @InjectRepository(UserAccountEntity)
    private readonly userRepository: Repository<UserAccountEntity>
    ) {}

    insertUser(user: UserAccount): Observable<UserAccount> { return from(this.userRepository.save(user)); }

    getAllUsers() { return this.userRepository.find() }

    getUser(u_id) { return this.userRepository.findOneBy(
        { u_id: u_id, }
    ) }  
    
}