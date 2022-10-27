import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
import { UserAccountService } from "../UserAccount/users.service";
import { DeleteResult, Repository, UpdateResult, IsNull } from "typeorm";
import { isNull } from "util";
import { ProviderAccountEntity } from "./providers.entity";
import { ProviderAccount } from "./providers.interface";

@Injectable()
export class ProviderAccountService {
  constructor(
    @InjectRepository(ProviderAccountEntity)
    private readonly providerRepository: Repository<ProviderAccountEntity>
    ) { }
    @Inject(UserAccountService)
    private readonly userService: UserAccountService;

  getAllProviders(): Observable<ProviderAccount[]> { return from(this.providerRepository.find()) }

  getProvider(pa_id): Observable<ProviderAccount> {
    return from(this.providerRepository.findOneBy(
      { pa_id: pa_id, }
    ))
  }

  getProviderCategory(providerCat: string): Observable<ProviderAccount[]> {
    if (providerCat === 'null') {
      return from(this.providerRepository.find({
        where: {
          pa_category: IsNull(),
        }
      }));
    }
    return from(this.providerRepository.find({
      where: {
        pa_category: providerCat,
      }
    }));
  }

  async insertProvider(provider: ProviderAccount, userId: number): Promise<ProviderAccount> { 
    const res =  await this.providerRepository.save(provider);
    this.userService.addProvider(userId, res.pa_id);
    return res;
  }

  updateProvider(pa_id: number, provider: ProviderAccount): Observable<UpdateResult> {
    return from(this.providerRepository.update(pa_id, provider));
  }

  deleteProvider(pa_id: number): Observable<DeleteResult> {
    return from(this.providerRepository.delete(pa_id))
  }

}