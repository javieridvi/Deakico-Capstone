import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
import { UserAccount } from "src/UserAccount/users.interface";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { LikeEntity } from "./likes.entity";
import { Likes } from "./likes.interface";

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly likeRepository: Repository<LikeEntity>
  ) { }

  getAllLikes(): Observable<Likes[]> { return from(this.likeRepository.find()); }

  getLike(l_id): Observable<Likes> {
    return from(this.likeRepository.findOneBy(
      { l_id: l_id, }
    ))
  }

  /**
   * Fetches user id and the items liked by given user id
   * @param userId the id of the user
   * @returns {Observable<Likes[]>} an observable promise
   * Can be modified to only return the items with querybuilder
   */
  getUserLiked(userId: number): Observable<Likes[]> {
    return from(this.likeRepository.find({
      select: {
        u_id: true,
      },
      relations: {
        likes_item: true,
      },
      where: {
        u_id: userId,
      }
    }))
  }

  async getItemLikes(itemId: number): Promise<number> {
    const res = await this.likeRepository
    .createQueryBuilder()
    .where("i_id = :i_id",{i_id: itemId})
    .getCount()
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

  deleteLike(l_id: number): Observable<DeleteResult> {
    return from(this.likeRepository.delete(l_id))
  }

}