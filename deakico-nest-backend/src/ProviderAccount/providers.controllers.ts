import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtGuard } from '../UserAccount/auth/guards/jwt.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ProviderAccount } from './providers.interface';
import { ProviderAccountService } from './providers.service';

@Controller('providers')
export class ProviderAccountController {
  constructor(private readonly providersService: ProviderAccountService) {}

  @Get()
  getAllProviders(): Observable<ProviderAccount[]> {
    return this.providersService.getAllProviders();
  }

  /**
   * Fetches user's provider account
   * @param req token user to retrieve the id of the provider
   * @returns user's provider account
   */
  @UseGuards(JwtGuard)
  @Get('account')
  getProvider(@Request() req: any): Observable<ProviderAccount> {
    return this.providersService.getProvider(req.user.pa_id);
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

  /**
   * Creates a provider account
   * @param provider info of provider account to be created
   * @param req token user to retrieve the id of the provider
   * @returns created provider account
   */
  @UseGuards(JwtGuard)
  @Post()
  insertProvider(
    @Body() provider: ProviderAccount,
    @Request() req: any,
  ): Promise<ProviderAccount> {
    return this.providersService.insertProvider(provider, req.user.u_id);
  }

  /**
   * Updates user's provider account
   * @param req token user to retrieve the id of the provider
   * @param provider info to be updated
   * @returns update confimation
   */
  @UseGuards(JwtGuard)
  @Put()
  updateProvider(
    @Request() req: any,
    @Body() provider: ProviderAccount,
  ): Observable<UpdateResult> {
    return this.providersService.updateProvider(req.user.pa_id, provider);
  }

  /**
   * Deletes the provider account of user
   * @param req token user to retrieve the id of the provider
   * @returns delete confirmation
   */
  @UseGuards(JwtGuard)
  @Delete()
  deleteProvider(@Request() req: any): Observable<DeleteResult> {
    return this.providersService.deleteProvider(req.user.pa_id);
  }
}
