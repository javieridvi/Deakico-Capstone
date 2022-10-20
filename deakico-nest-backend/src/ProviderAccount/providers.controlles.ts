import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Observable } from "rxjs";
import { DeleteResult, UpdateResult } from "typeorm";
import { ProviderAccount } from "./providers.interface";
import { ProviderAccountService } from "./providers.service";

@Controller('providers')
export class ProviderAccountController {
  constructor(private readonly providersService: ProviderAccountService) { }


  @Get()
  getAllProviders(): Observable<ProviderAccount[]> {
    return this.providersService.getAllProviders();
  }

  @Get(':pa_id')
  getProvider(@Param('pa_id') pa_Id: number,): Observable<ProviderAccount> {
    return this.providersService.getProvider(pa_Id);
  }

  /**
   * Fetches list of providers that belong to given category or are null
   * @param providerCat string of 'null' or of category of provider
   * @returns all providers that are part of given category or null
   */
  @Get('category/:pa_category')
  getProviderCategory(@Param('pa_category') providerCat: string) {
    return this.providersService.getProviderCategory(providerCat);
  }

  @Post()
  insertProvider(@Body() provider: ProviderAccount): Observable<ProviderAccount> {
    return this.providersService.insertProvider(provider);
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