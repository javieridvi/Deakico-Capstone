import { Injectable, NotFoundException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { ProviderAccountEntity } from "./providers.entity";
import { ProviderAccount } from "./providers.interface";

@Injectable()
export class ProviderAccountService {
    constructor(
    @InjectRepository(ProviderAccountEntity)
    private readonly providerRepository: Repository<ProviderAccountEntity>
    ) {}

    insertProvider(provider: ProviderAccount): Observable<ProviderAccount> { return from(this.providerRepository.save(provider)); }

    getAllProviders(): Observable<ProviderAccount[]> { return from(this.providerRepository.find()) }

    getProvider(pa_id): Observable<ProviderAccount> { return from(this.providerRepository.findOneBy(
            { pa_id: pa_id, }
        )) }   

    updateProvider(pa_id: number, provider: ProviderAccount): Observable<UpdateResult> { 
        return from(this.providerRepository.update(pa_id, provider));
    }
    
    deleteProvider(pa_id: number): Observable<DeleteResult> {
        return from(this.providerRepository.delete(pa_id))
    }
    
}