import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { throws } from "assert";
import { Observable } from "rxjs";
import { ProviderAccount } from "./providers.interface";
import { ProviderAccountService } from "./providers.service";

@Controller('providers')
export class ProviderAccountController {
    constructor(private readonly providersService: ProviderAccountService) {}

    @Post()
    insertProvider(@Body() provider: ProviderAccount): Observable<ProviderAccount> {
        return this.providersService.insertProvider(provider);
    }

    @Get()
    getAllProviders(){
        return this.providersService.getAllProviders();
    }

    @Get(':pa_id')
    getProvider(@Param('pa_id') pa_Id: number,) {
        return this.providersService.getProvider(pa_Id);
    }
}