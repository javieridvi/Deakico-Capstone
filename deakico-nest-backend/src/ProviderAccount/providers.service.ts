import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'express';
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

  getAllProviders(): Observable<ProviderAccount[]> {
    return from(this.providerRepository.find({}));
  }

  // async getAllProvidersWithFollow(uID: number): Promise<ProviderAccount[]> {
  //   const response = await this.providerRepository
  //       .createQueryBuilder('provider')
  //       .leftJoin('provider.follows', 'follow', 'follow.pa_id = provider.pa_id')
  //       .select('provider')
  //       .addSelect('CASE WHEN follow.u_id = :u_id THEN true ELSE false END',  {u_id: uID})
  //       .getRawMany()
  //   return response;
  // }
  
//   SELECT PA.*,
//   Case
//       When (F.u_id = 19)
//       THEN true
//       ELSE false
//       END AS following
// From "Provider Account" PA
// LEFT JOIN "Follows" F on PA.pa_id = F.pa_id;

  getProvider(pa_id): Observable<ProviderAccount> {
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
