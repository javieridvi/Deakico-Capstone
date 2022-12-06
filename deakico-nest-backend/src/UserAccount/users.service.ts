import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { FollowsService } from '../Follows/follows.service';
import { LikesService } from '../Likes/likes.service';
import { ProviderAccountService } from '../ProviderAccount/providers.service';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserAccountEntity } from './users.entity';
import { UserAccount } from './users.interface';
import { RequestService } from '../Request/requests.service';

@Injectable()
export class UserAccountService {
  constructor(
    @InjectRepository(UserAccountEntity)
    private readonly userRepository: Repository<UserAccountEntity>,  
  ) {}    
  @Inject(forwardRef(() => ProviderAccountService))
  private readonly providerService: ProviderAccountService;
  @Inject(FollowsService)
  private readonly followsService: FollowsService;
  @Inject(LikesService)
  private readonly likesService: LikesService;
  @Inject(RequestService)
  private readonly requestService: RequestService;
  
  insertUser(user: UserAccount): Observable<UserAccount> {
    return from(this.userRepository.save(user));
  }

  getAllUsers(): Observable<UserAccount[]> {
    return from(this.userRepository.find());
  }

  getUser(u_id): Observable<UserAccount> {
    return from(this.userRepository.findOneBy({ u_id: u_id }));
  }

  updateUser(u_id: number, user: UserAccount): Observable<UpdateResult> {
    return from(this.userRepository.update(u_id, user));
  }

  addProvider(u_id: number, providerId: number): Observable<UpdateResult> {
    const user = { pa_id: providerId };
    return from(this.userRepository.update(u_id, user));
  }

  async deleteUser(u_id: number, pa_id: number): Promise<UpdateResult> {
    if(pa_id) {  //if pa_id is not null
      //disable provider and all its items and what not,
      //then disable user and delete all follows and likes
      await this.providerService.deleteProvider(pa_id, u_id).then(() => {
        this.likesService.deleteLikesOfUser(u_id);
        this.followsService.deleteFollowsOfUser(u_id);
        return this.userRepository.update(u_id, {disabled: true});
      }).catch(() => {
        throw new Error('User or Provider Deletion Unsuccessful!');
      });
    }
    else {  //if pa_id is in fact null 
      //delete follows and likes, and then disable user
      try {
        this.requestService.unableUserRequests(u_id);
        this.likesService.deleteLikesOfUser(u_id);
        this.followsService.deleteFollowsOfUser(u_id);
        return this.userRepository.update(u_id, {disabled: true});
      } catch {
        throw new Error('User Deletion Unsuccesful!')
      }
      
    }
 
  }
}
