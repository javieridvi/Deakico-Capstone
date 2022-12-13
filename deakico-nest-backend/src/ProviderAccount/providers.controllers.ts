import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
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
import getUploadImageUrl from 'src/imageS3';

@Controller('providers')
export class ProviderAccountController {
  constructor(private readonly providersService: ProviderAccountService) {}

  @Get()
  getAllProviders(): Promise<ProviderAccount[]> {
    return this.providersService.getAllProviders();
  }

  @UseGuards(JwtGuard)  
  @Get('follows')
  getAllProvidersWithFollow(@Request() req: any): Promise<ProviderAccount[]> {
    return this.providersService.getAllProvidersWithFollow(req.user.u_id);
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

  // getProviderImageUploadUrl
  @UseGuards(JwtGuard)
  @Get('image')
  async getImageUrl(@Request() req: any): Promise<String> {
    const url = await getUploadImageUrl('provider/'+req.user.pa_id+'/profile/');
    return url;
  }
  /**
   * Fetches user's provider account
   * @param pa_id id of provider to return
   * @returns user's provider account
   */
  @Post('profile')
  getProviderProfile(@Body() data: Partial<ProviderAccount>): Observable<ProviderAccount> {
    return this.providersService.getProvider(data.pa_id);
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
  deleteProvider(@Request() req: any): Promise<UpdateResult> {
    try {
      return this.providersService.deleteProvider(req.user.pa_id, req.user.u_id);
    }
    catch(error) {
      throw new HttpException('Provider Deletion Unsuccessful!', HttpStatus.BAD_REQUEST, {cause: error});
    }
  }
}
