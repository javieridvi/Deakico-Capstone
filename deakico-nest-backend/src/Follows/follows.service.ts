import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { UserAccount } from '../UserAccount/users.interface';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { FollowEntity } from './follows.entity';
import { Follow } from './follows.interface';

@Injectable()
export class FollowsService {
  constructor(
    @InjectRepository(FollowEntity)
    private readonly followRepository: Repository<FollowEntity>,
  ) {}

  getAllFollows(): Observable<Follow[]> {
    return from(this.followRepository.find());
  }

  async getFollowers(providerId: number): Promise<FollowEntity[]> {
    const res = await this.followRepository
      .createQueryBuilder()
      .select('u_id')
      .where('pa_id = :pa_id', { pa_id: providerId })
      .getRawMany();
    return res;
  }

  async getFollowersCount(providerId: number): Promise<number> {
    const res = await this.followRepository
      .createQueryBuilder()
      .where('pa_id = :pa_id', { pa_id: providerId })
      .getCount();
    return res;
  }

  async getFollowersGroupByDate(providerId: number): Promise<Partial<Follow[]>> {
    const res = await this.followRepository.manager
    .query(`select count(*), "Follows".f_date::date from "Follows"
    where pa_id = $1
    group by (f_date::date);`,
    [providerId]);
    return res;
  }

  async getFollowing(userId: number): Promise<FollowEntity[]> {
    const res = await this.followRepository
      .createQueryBuilder('follows')
      .leftJoin('follows.follows_provider', 'provider', 'provider.pa_id = follows.pa_id')
      .select('provider')
      .where('u_id = :u_id', { u_id: userId })
      .getRawMany();
    return res;
  }

  async getFollowingCount(userId: number): Promise<number> {
    const res = await this.followRepository
      .createQueryBuilder()
      .where('u_id = :u_id', { u_id: userId })
      .getCount();
    return res;
  }

  insertFollow(user: UserAccount, follow: Follow): Observable<Follow> {
    follow.u_id = user.u_id;
    if (follow.pa_id === user.pa_id) {
      console.log(follow.pa_id);
      throw new Error("Can't follow your own provider account");
    }
    return from(this.followRepository.save(follow));
  }

  deleteFollow(userId: number, follow: Follow): Observable<DeleteResult> {
    follow.u_id = userId;
    return from(
      this.followRepository.delete(follow),
    );
  }

  deleteFollowsOfProvider(providerId: number): Observable<DeleteResult> {
    return from(
      this.followRepository.delete({ pa_id: providerId }),
    );
  }

  deleteFollowsOfUser(userId: number): Observable<DeleteResult> {
    return from(
      this.followRepository.delete({ u_id: userId }),
    );
  }

}
