import { Injectable, NotFoundException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
import { Repository } from "typeorm";
import { ItemEntity} from "./items.entity";
import { Item } from "./items.interface";

@Injectable()
export class ItemsService {
    constructor(
    @InjectRepository(ItemEntity)
    private readonly itemRepository: Repository<ItemEntity>
    ) {}

    insertItem(item: Item): Observable<Item> { return from(this.itemRepository.save(item)); }

    getAllItems() { return this.itemRepository.find() }

    getItem(i_id) { return this.itemRepository.findOneBy(
        { i_id: i_id, }
    ) }  
    
}