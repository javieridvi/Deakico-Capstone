import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ItemEntity } from './items.entity';
import { Item } from './items.interface';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemEntity)
    private readonly itemRepository: Repository<ItemEntity>,
  ) {}

  getAllItems(): Observable<Item[]> {
    return from(this.itemRepository.find({
      where: {
        disabled: false,
      }
    }));
  }

  getItem(i_id): Observable<Item> {
    return from(this.itemRepository.findOneBy({ i_id: i_id, disabled: false }));
  }

  async getItemByType(itemType: string): Promise<Observable<Item[]>> {
    await this.itemRepository.findOneOrFail({
      select: {i_id: true},
      where: {
        i_type: itemType,
        disabled: false,
      }
    })
    return from(
      this.itemRepository.find({
        where: {
          i_type: itemType,
          disabled: false,
        },
      }),
    );
  }

  async getItemCategories(): Promise<Partial<Item[]>> {
    const categories = await this.itemRepository
      .createQueryBuilder()
      .select('i_category')
      .where('disabled = false')
      .distinct(true)
      .getRawMany();
    return categories;
  }

  async getItemByCategory(itemCategory: string): Promise<Observable<Item[]>> {
    await this.itemRepository.findOneOrFail({
      select: {i_id: true},
      where: {
        i_category: itemCategory,
        disabled: false,
      }
    });
    return from(
      this.itemRepository.find({
        where: {
          i_category: itemCategory,
          disabled: false,
        },
      }),
    );
  }

  async getItemOfProvider(itemProvider: number): Promise<Observable<Item[]>> {
      await this.itemRepository.findOneOrFail({
        select: { pa_id: true },
        where: { 
          pa_id: itemProvider,
          disabled: false,
         },
      });
    return from(this.itemRepository.find({
      where: {
        pa_id: itemProvider,
        disabled: false,
      }
    }));
  }

  insertItem(provierId: number, item: Item): Observable<Item> {
    item.pa_id = provierId;
    return from(this.itemRepository.save(item));
  }

  async updateItem(
    itemId: number,
    item: Item,
    providerId: number,
  ): Promise<Observable<UpdateResult>> {
    //check if item exists and belongs to provider
    await this.itemRepository.findOneOrFail({
      select: { pa_id: true },
      where: { 
        i_id: itemId, 
        pa_id: providerId,
        disabled: false,  
      },
    });
    return from(this.itemRepository.update(itemId, item));
  }

  async deleteItem(
    itemId: number,
    item: Item,
    providerId: number,
  ): Promise<Observable<UpdateResult>> {
    //check if item exists and belongs to provider
    await this.itemRepository.findOneOrFail({
      select: { pa_id: true },
      where: { 
        i_id: itemId, 
        pa_id: providerId,
        disabled: false,
      },
    });
    return from(this.itemRepository.update(itemId, item));
  }

  async deleteAllItems(
    providerId: number,
  ): Promise<Observable<UpdateResult>> {
    //check if item exists and belongs to provider
    await this.itemRepository.findOneOrFail({
      select: { pa_id: true },
      // where: { 
      //   pa_id: providerId,
      //   disabled: false,
      // },
    });
    return from(this.itemRepository.update({pa_id: providerId}, {disabled: true}));
  }

}
