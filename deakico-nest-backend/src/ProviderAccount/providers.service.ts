import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { UserAccountService } from '../UserAccount/users.service';
import { DeleteResult, Repository, UpdateResult, IsNull } from 'typeorm';
import { isNull } from 'util';
import { ProviderAccountEntity } from './providers.entity';
import { ProviderAccount } from './providers.interface';
import { ItemsService } from '../Item/items.service';
import { LikesService } from 'src/Likes/likes.service';
import { FollowsService } from 'src/Follows/follows.service';

@Injectable()
export class ProviderAccountService {
  constructor(
    @InjectRepository(ProviderAccountEntity)
    private readonly providerRepository: Repository<ProviderAccountEntity>,
  ) {}
  @Inject(UserAccountService)
  private readonly userService: UserAccountService;
  @Inject(ItemsService)
  private readonly itemService: ItemsService;
  @Inject(LikesService)
  private readonly likesService: LikesService;
  @Inject(FollowsService)
  private readonly followsService: FollowsService;

  getAllProviders(): Observable<ProviderAccount[]> {
    return from(this.providerRepository.find({
      where: {
        disabled: false,
      }
    }));
  }

  getProvider(pa_id): Observable<ProviderAccount> {
    return from(this.providerRepository.findOneBy({ pa_id: pa_id }));
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
