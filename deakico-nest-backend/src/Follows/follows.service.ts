import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
import { UserAccount } from "src/UserAccount/users.interface";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { FollowEntity } from "./follows.entity";
import { Follow } from "./follows.interface";

@Injectable()
export class FollowsService {
  constructor(
    @InjectRepository(FollowEntity)
    private readonly followRepository: Repository<FollowEntity>
  ) { }

  getAllFollows(): Observable<Follow[]> { return from(this.followRepository.find()) }

  getFollow(f_id): Observable<Follow> {
    return from(this.followRepository.findOneBy(
      { f_id: f_id, }
    ))
  }

  async getFollowersCount(providerId: number): Promise<number> {
    const res = await this.followRepository
      .createQueryBuilder()
      .where("pa_id = :pa_id", { pa_id: providerId })
      .getCount()
    return res;
  }

  async getFollowers(providerId: number): Promise<FollowEntity[]> {
    const res = await this.followRepository
      .createQueryBuilder()
      .select("u_id")
      .where("pa_id = :pa_id", { pa_id: providerId })
      .getRawMany()
    console.log(res);
    return res;
  }

  async getFollowingCount(userId: number): Promise<number> {
    const res = await this.followRepository
      .createQueryBuilder()
      .where("u_id = :u_id", { u_id: userId })
      .getCount()
    return res;
  }

  async getFollowing(userId: number): Promise<FollowEntity[]> {
    const res = await this.followRepository
      .createQueryBuilder()
      .select("pa_id")
      .where("u_id = :u_id", { u_id: userId })
      .getRawMany()
    return res;
  }

  insertFollow(user: UserAccount, follow: Follow): Observable<Follow> { 
    follow.u_id = user.u_id;
    if(follow.pa_id === user.pa_id){
      throw new Error("Can't follow your own provider account");
    }
    return from(this.followRepository.save(follow)); 
  }

  updateFollow(f_id: number, follow: Follow): Observable<UpdateResult> {
    return from(this.followRepository.update(f_id, follow));
  }

  deleteFollow(f_id: number): Observable<DeleteResult> {
    return from(this.followRepository.delete(f_id))
  }
}