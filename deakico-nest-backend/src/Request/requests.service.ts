import { Injectable, NotFoundException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
import { Repository } from "typeorm";
import { RequestEntity } from "./requests.entity";
import { ItemRequest } from "./requests.interface";

@Injectable()
export class RequestService {
    constructor(
    @InjectRepository(RequestEntity)
    private readonly requestRepository: Repository<RequestEntity>
    ) {}

    insertRequest(itemRequest: ItemRequest): Observable<ItemRequest> { return from(this.requestRepository.save(itemRequest)); }

    getAllRequests() { return this.requestRepository.find() }

    getRequest(req_id) { return this.requestRepository.findOneBy(
        { req_id: req_id, }
    ) }   
    
}