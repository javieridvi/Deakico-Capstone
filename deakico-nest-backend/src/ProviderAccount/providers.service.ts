import { Injectable, NotFoundException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
import { Repository } from "typeorm";
import { ProviderAccountEntity } from "./providers.entity";
import { ProviderAccount } from "./providers.interface";

@Injectable()
export class ProviderAccountService {
    constructor(
    @InjectRepository(ProviderAccountEntity)
    private readonly providerRepository: Repository<ProviderAccountEntity>
    ) {}

    insertProvider(provider: ProviderAccount): Observable<ProviderAccount> { return from(this.providerRepository.save(provider)); }

    getAllProviders() { return this.providerRepository.find() }

    getProvider(pa_id) { return this.providerRepository.findOneBy(
            { pa_id: pa_id, }
        ) }   
    
}