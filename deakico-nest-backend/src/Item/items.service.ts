import { Injectable, NotFoundException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { ItemEntity} from "./items.entity";
import { Item } from "./items.interface";

@Injectable()
export class ItemsService {
    constructor(
    @InjectRepository(ItemEntity)
    private readonly itemRepository: Repository<ItemEntity>
    ) {}

    insertItem(item: Item): Observable<Item> { return from(this.itemRepository.save(item)); }

    getAllItems(): Observable<Item[]> { return from(this.itemRepository.find()); }

    getItem(i_id): Observable<Item> { return from(this.itemRepository.findOneBy(
        { i_id: i_id, }
    )) }  
    
    updateItem(i_id: number, item: Item): Observable<UpdateResult> { 
        return from(this.itemRepository.update(i_id, item));
     }

     deleteItem(i_id: number): Observable<DeleteResult> {
        return from(this.itemRepository.delete(i_id))
     }
}