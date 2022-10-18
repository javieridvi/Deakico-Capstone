import { Injectable, NotFoundException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { RequestEntity } from "./requests.entity";
import { ItemRequest } from "./requests.interface";

@Injectable()
export class RequestService {
    constructor(
    @InjectRepository(RequestEntity)
    private readonly requestRepository: Repository<RequestEntity>
    ) {}

    insertRequest(itemRequest: ItemRequest): Observable<ItemRequest> { return from(this.requestRepository.save(itemRequest)); }

    getAllRequests(): Observable<ItemRequest[]> { return from(this.requestRepository.find()) }

    getRequest(req_id): Observable<ItemRequest> { return from(this.requestRepository.findOneBy(
        { req_id: req_id, }
    )) }   

    updateRequest(req_id: number, request: ItemRequest): Observable<UpdateResult> { 
        return from(this.requestRepository.update(req_id, request));
    }
    
    deleteRequest(req_id: number): Observable<DeleteResult> {
        return from(this.requestRepository.delete(req_id))
    }
}