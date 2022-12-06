import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, IsNull, Repository, UpdateResult } from 'typeorm';
import { UserAccountService } from '../UserAccount/users.service';
import { ProviderAccountEntity } from './providers.entity';
import { ProviderAccount } from './providers.interface';

@Injectable()
export class ProviderAccountService {
  constructor(
    @InjectRepository(ProviderAccountEntity)
    private readonly providerRepository: Repository<ProviderAccountEntity>,
  ) {}
  @Inject(UserAccountService)
  private readonly userService: UserAccountService;

  async getAllProviders(): Promise<ProviderAccount[]> {
    const response = await this.providerRepository
    .createQueryBuilder()
    .select([
      'pa_id AS id',
      'pa_companyname AS companyname',
      'pa_desc AS desc',
      'pa_rating AS rating',
      'pa_category AS category',
      ])
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
          ])
        .addSelect(('CASE WHEN (follow.pa_id = provider.pa_id) THEN true ELSE false END'), 'following')
        .setParameter('u_id', uID)
        .getRawMany()
    return response;
  }

  getProvider(pa_id: number): Observable<ProviderAccount> {
    return from(this.providerRepository.findOneBy({ pa_id: pa_id }));
  }

  getProviderCategory(providerCat: string): Observable<ProviderAccount[]> {
    if (providerCat === 'null') {
      return from(
        this.providerRepository.find({
          where: {
            pa_category: IsNull(),
          },
        }),
      );
    }
    return from(
      this.providerRepository.find({
        where: {
          pa_category: providerCat,
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

  deleteProvider(pa_id: number): Observable<DeleteResult> {
    return from(this.providerRepository.delete(pa_id));
  }
}
