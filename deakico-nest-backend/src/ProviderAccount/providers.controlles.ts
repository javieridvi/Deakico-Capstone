import { Controller, Post, Body, Get, Param, Put, Delete } from "@nestjs/common";
import { throws } from "assert";
import { Observable } from "rxjs";
import { DeleteResult, UpdateResult } from "typeorm";
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
    getAllProviders(): Observable<ProviderAccount[]>{
        return this.providersService.getAllProviders();
    }

    @Get(':pa_id')
    getProvider(@Param('pa_id') pa_Id: number,): Observable<ProviderAccount> {
        return this.providersService.getProvider(pa_Id);
    }

    @Put(':pa_id')
    updateProvider(
        @Param('pa_id') pa_Id: number,
        @Body() provider: ProviderAccount,
    ): Observable<UpdateResult> {
        return this.providersService.updateProvider(pa_Id, provider);
    }

    @Delete(':pa_id')
    deleteProvider(
        @Param('pa_id') pa_Id: number,): Observable<DeleteResult> {
            return this.providersService.deleteProvider(pa_Id);
    }
}