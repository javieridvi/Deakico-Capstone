import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
import { UserAccount } from "src/UserAccount/users.interface";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { ItemEntity } from "./items.entity";
import { Item } from "./items.interface";

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemEntity)
    private readonly itemRepository: Repository<ItemEntity>
  ) { }


  getAllItems(): Observable<Item[]> { return from(this.itemRepository.find()); }

  getItem(i_id): Observable<Item> {
    return from(this.itemRepository.findOneBy(
      { i_id: i_id, }
    ))
  }

  getItemByType(itemType: string): Observable<Item[]> {
    return from(this.itemRepository.find({
      where: {
        i_type: itemType,
      }
    }));
  }

  async getItemCategories(): Promise<Partial<Item[]>> {
    const categories = await this.itemRepository
      .createQueryBuilder()
      .select("i_category")
      .distinct(true)
      .getRawMany();
    return categories;
  }

  getItemByCategory(itemCategory: string): Observable<Item[]> {
    return from(this.itemRepository.find({
      where: {
        i_category: itemCategory,
      }
    }));
  }

  getItemOfProvider(itemProvider: number): Observable<Item[]> {
    return from(this.itemRepository.find({
      where: {
        pa_id: itemProvider,
      }
    }));
  }

  insertItem(user: UserAccount, item: Item): Observable<Item> { 
    item.pa_id = user.pa_id;
    return from(this.itemRepository.save(item)); 
  }

  updateItem(i_id: number, item: Item): Observable<UpdateResult> {
    return from(this.itemRepository.update(i_id, item));
  }

  deleteItem(i_id: number): Observable<DeleteResult> {
    return from(this.itemRepository.delete(i_id))
  }
}