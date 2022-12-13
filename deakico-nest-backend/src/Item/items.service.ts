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
  ) { }

  getAllItems(): Observable<Item[]> {
    return from(this.itemRepository.find({
      where: {
        disabled: false,
      }
    }));
  }

  getItem(i_id: number): Observable<Item> {
    return from(this.itemRepository.findOneBy({ i_id: i_id, disabled: false }));
  }

  async getItemProvider(iId: number): Promise<Partial<Item>> {
    const response = await this.itemRepository
    .createQueryBuilder()
    .select('pa_id')
    .where('i_id = :iId', {iId})
    .getRawOne()
    return response;
  }

  async getItemByType(itemType: string): Promise<Observable<Item[]>> {
    await this.itemRepository.findOneOrFail({
      select: { i_id: true },
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
      select: { i_id: true },
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

  async getItemOfProvider(paID: number): Promise<Item[]> {
    return await this.itemRepository
      .createQueryBuilder()
      .select('i_id', 'id')
      .addSelect('i_name', 'name')
      .addSelect('i_description', 'description')
      .addSelect('i_price', 'price')
      .addSelect('i_category', 'category')
      .addSelect('i_rating', 'rating')
      .addSelect('i_type', 'type')
      .addSelect('i_image', 'image')
      .addSelect('s_timeslot', 'timeslot')
      .addSelect('pa_id', 'providerId')
      .where('disabled = false')
      .andWhere('pa_id = :paID', { paID })
      .getRawMany()
  }

  async getItemOfProviderLiked(paID: number, uID: number): Promise<Item[]> {
    return await this.itemRepository
      .createQueryBuilder('items')
      .leftJoin('items.likes', 'likes', 'likes.i_id = items.i_id AND likes.u_id = :u_id')
      .select('items.i_id', 'id')
      .addSelect('items.i_name', 'name')
      .addSelect('items.i_description', 'description')
      .addSelect('items.i_price', 'price')
      .addSelect('items.i_category', 'category')
      .addSelect('items.i_rating', 'rating')
      .addSelect('items.i_type', 'type')
      .addSelect('items.i_image', 'image')
      .addSelect('items.s_timeslot', 'timeslot')
      .addSelect('items.pa_id', 'providerId')
      .where('items.disabled = false')
      .andWhere('pa_id = :paID', { paID })
      .addSelect(('CASE WHEN (likes.i_id = items.i_id) THEN true ELSE false END'), 'liked')
      .setParameter('u_id', uID)
      .getRawMany()
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

  async deleteItem( itemId: number, providerId: number ): Promise<UpdateResult> {
    //check if item exists and belongs to provider
    await this.itemRepository.findOneOrFail({
      select: { pa_id: true },
      where: {
        i_id: itemId,
        pa_id: providerId,
        disabled: false,
      },
    });
    const response =  await this.itemRepository
    .createQueryBuilder()
    .update()
    .set({
      disabled: true,
    })
    .where("i_id = :i_id", { i_id: itemId })
    .execute()
    return response;
  }

  /**This is a helper service that deletes (disables) all items
   * of a single provider. This is useful for provider deletion.
   * 
   * @param providerId 
   * @returns an Update Result
   */
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
    return from(this.itemRepository.update({ pa_id: providerId }, { disabled: true }));
  }

}
