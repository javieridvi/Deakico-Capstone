import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, IsNull, Repository, UpdateResult } from 'typeorm';
import { UserAccountService } from '../UserAccount/users.service';
import { ProviderAccountEntity } from './providers.entity';
import { ProviderAccount } from './providers.interface';
import { ItemsService } from '../Item/items.service';
import { LikesService } from '../Likes/likes.service';
import { FollowsService } from '../Follows/follows.service';

@Injectable()
export class ProviderAccountService {
  constructor(
    @InjectRepository(ProviderAccountEntity)
    private readonly providerRepository: Repository<ProviderAccountEntity>,   
    @Inject(forwardRef(() => UserAccountService))
   private readonly userService: UserAccountService,
  ) {}

  @Inject(ItemsService)
  private readonly itemService: ItemsService;
  @Inject(LikesService)
  private readonly likesService: LikesService;
  @Inject(FollowsService)
  private readonly followsService: FollowsService;

  async getAllProviders(): Promise<ProviderAccount[]> {
    const response = await this.providerRepository
    .createQueryBuilder()
    .select([
      'pa_id AS id',
      'pa_companyname AS companyname',
      'pa_desc AS desc',
      'pa_rating AS rating',
      'pa_category AS category',
      'pa_type AS type',
      ])
      .where('disabled = false')
    .getRawMany()
    return response;
  }

  async getAllProvidersWithFollow(uID: number): Promise<ProviderAccount[]> {

    const response = await this.providerRepository
        .createQueryBuilder('provider')
        .leftJoin('provider.follows', 'follow', 'follow.pa_id = provider.pa_id AND follow.u_id = :u_id')
        .select([
          'provider.pa_id AS id',
          'provider.pa_companyname AS companyname',
          'provider.pa_desc AS desc',
          'provider.pa_rating AS rating',
          'provider.pa_category AS category',
          'provider.pa_type AS type',
          ])
        .addSelect(('CASE WHEN (follow.pa_id = provider.pa_id) THEN true ELSE false END'), 'following')
        .setParameter('u_id', uID)
        .where('provider.disabled = false')
        .getRawMany()
    return response;
  }

  getProvider(pa_id: number): Observable<ProviderAccount> {
    return from(this.providerRepository.findOneByOrFail({ pa_id: pa_id, disabled: false }));
  }

  async getProviderCategory(providerCat: string): Promise<Observable<ProviderAccount[]>> {
    await this.providerRepository.findOneOrFail({
      select: {pa_id: true},
      where: {
        pa_category: providerCat,
        disabled: false,
      }
    })
    return from(
      this.providerRepository.find({
        where: {
          pa_category: providerCat,
          disabled: false,
        },
      }),
    );
  }

  async insertProvider(
    provider: ProviderAccount,
    userId: number,
  ): Promise<ProviderAccount> {
    const res = await this.providerRepository.save(provider);
    this.userService.addProvider(userId, res.pa_id);
    return res;
  }

  updateProvider(
    pa_id: number,
    provider: ProviderAccount,
  ): Observable<UpdateResult> {
    return from(this.providerRepository.update(pa_id, provider));
  }

  async deleteProvider(pa_id: number, u_id: number): Promise<UpdateResult> {
    await this.itemService.deleteAllItems(pa_id).then(() => {  
      this.userService.updateUser(u_id, {pa_id: null});
      this.followsService.deleteFollowsOfProvider(pa_id);
      this.likesService.deleteLikesOfProvider(pa_id);
      return from(this.providerRepository.update(pa_id, {disabled: true}));
      }
    ).catch(() => {
      throw new Error('Provider Deletion Unsuccessful!');
    });
    return;
  }
}
