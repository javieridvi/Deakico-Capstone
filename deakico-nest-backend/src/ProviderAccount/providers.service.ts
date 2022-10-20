import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
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

  insertProvider(provider: ProviderAccount): Observable<ProviderAccount> { return from(this.providerRepository.save(provider)); }

  updateProvider(pa_id: number, provider: ProviderAccount): Observable<UpdateResult> {
    return from(this.providerRepository.update(pa_id, provider));
  }

  deleteProvider(pa_id: number): Observable<DeleteResult> {
    return from(this.providerRepository.delete(pa_id))
  }

}