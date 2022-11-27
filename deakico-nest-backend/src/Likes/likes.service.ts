import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { UserAccount } from '../UserAccount/users.interface';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { LikeEntity } from './likes.entity';
import { Likes } from './likes.interface';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly likeRepository: Repository<LikeEntity>,
  ) {}

  getAllLikes(): Observable<Likes[]> {
    return from(this.likeRepository.find());
  }

  /**Gets all items of a given provider and the amount of likes it has.
   * 
   * @param providerId the pa_id of the logged-in provider
   * @returns a list of Item objects with an additional 'likes' attribute that contains
   *          the amount of likes each item has.
   */
  async getLikesOfProvider(providerId: number): Promise<Partial<Likes[]>> {
    const res = await this.likeRepository.manager
    .query(`select I.i_id, I.i_name, I.i_type, I.i_category, I.i_description, I.i_price, I.i_rating, I.s_timeslot, I.p_stock,
    count(L.i_id) as likes from "Items" as I full outer join "Likes" L on I.i_id = L.i_id
    where pa_id = $1
    group by I.i_id;`,
    [providerId])
    return res;
  }

  /**
   * Fetches user id and the items liked by given user id
   * @param userId the id of the user
   * @returns {Observable<Likes[]>} an observable promise
   * Can be modified to only return the items with querybuilder
   */
  async getUserLiked(userId: number): Promise<Partial<Likes[]>> {
    const res = await this.likeRepository
      .createQueryBuilder('likes')
      .innerJoin('likes.likes_item', 'items')
      .select('items')
      .where('likes.u_id = :u_id', { u_id: userId })
      .getRawMany();
    return res;
  }

  async getItemLikes(itemId: number): Promise<number> {
    const res = await this.likeRepository
      .createQueryBuilder()
      .where('i_id = :i_id', { i_id: itemId })
      .getCount();
    return res;
  }
  /**
   * Insertion service method to insert into Likes table in database.
   * @param {UserAccount} user the user that likes the item
   * @param {Likes} like Likes object to be saved to the database
   * @returns {Observable<Likes>} an observable Promise (a promise given representation).
   */
  insertLike(user: UserAccount, like: Likes): Observable<Likes> {
    like.u_id = user.u_id;
    return from(this.likeRepository.save(like));
  }

  updateLike(l_id: number, like: Likes): Observable<UpdateResult> {
    return from(this.likeRepository.update(l_id, like));
  }

  deleteLike(userId: number, itemId: number): Observable<DeleteResult> {
    return from(this.likeRepository.delete({ u_id: userId, i_id: itemId }));
  }
}
