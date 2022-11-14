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
