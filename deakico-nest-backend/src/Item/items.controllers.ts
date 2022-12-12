import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtGuard } from '../UserAccount/auth/guards/jwt.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Item } from './items.interface';
import { ItemsService } from './items.service';
import { ProviderAccountEntity } from 'src/ProviderAccount/providers.entity';
import getUploadImageUrl from '../imageS3';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) { }

  @Get()
  getAllItems(): Observable<Item[]> {
    return this.itemsService.getAllItems();
  }

  @Get('/id/:i_id')
  getItem(@Param('i_id') itemId: number): Observable<Item> {
    return this.itemsService.getItem(itemId);
  }

  @UseGuards(JwtGuard)
  @Get('image')
  async getImageUrl(@Request() req: any): Promise<String> {
    const url = await getUploadImageUrl('provider/'+req.user.pa_id+'/item/');
    console.log(url)
    return url;
  }

  /**
   * Fetches items depending on their type (product or service)
   * @param itemType the type that is being requested
   * @returns {Observable<Likes>} an observable Promise (a promise given representation).
   */
  @Get('type/:i_type')
  getItemByType(@Param('i_type') itemType: string): Promise<Observable<Item[]>> {
    const types = ['product', 'service'];
    if (types.includes(itemType)) {
      return this.itemsService.getItemByType(itemType);
    } else {
      throw new HttpException('Not a type', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   *Fetches distinct item categories
   * @returns {Promise<Partial<Item[]>> } a partial Promise (a promise given representation).
   */
  @Get('category')
  getItemCategories(): Promise<Partial<Item[]>> {
    return this.itemsService.getItemCategories();
  }

  /**
   * Fetches all items that are from given itemCategory
   * @param itemCategory the name of category that is being requested
   * @returns {Observable<Item[]>} an observable promise
   */
  @Get('category/:i_category')
  getItemByCategory(
    @Param('i_category') itemCategory: string,
  ): Promise<Observable<Item[]>> {
    return this.itemsService.getItemByCategory(itemCategory);
  }

  /**Fetches Items of given provider's pa_id
   * 
   * @param data 
   * @returns list of Items of the provider
   */
  @Post('provider')
  getItemOfProvider(@Body() data: Partial<ProviderAccountEntity>): Promise<Item[]> {
    return this.itemsService.getItemOfProvider(data.pa_id);
  }

  // /**
  //  * Fetches all items from given itemProvider
  //  * @param req token used to retrieve the id of the provider
  //  * @returns {Observable<Item[]>} an observable promise
  //  */
  @UseGuards(JwtGuard)
  @Post('provider/liked')
  getItemOfProviderLiked(@Body() data: Partial<ProviderAccountEntity>, @Request() req: any): Promise<Item[]> {
    return this.itemsService.getItemOfProviderLiked(data.pa_id, req.user.u_id);
  }

  /**
   * Creates and returns a new item
   * @param item the info of the item to be created
   * @param req token used to retrieve the id of the provider
   * @returns the item created
   */
  @UseGuards(JwtGuard)
  @Post()
  insertItem(@Body() item: Item, @Request() req: any): Observable<Item> {
    return this.itemsService.insertItem(req.user.pa_id, item);
  }

  /**
   * Updates given item id (Provider must own this item)
   * @param itemId id of the item being updated
   * @param item info of the item to be updated
   * @param req token user to retrieve the id of the provider
   * @returns update confirmation
   */
  @UseGuards(JwtGuard)
  @Put('/id/:i_id')
  updateItem(
    @Param('i_id') itemId: number,
    @Body() item: Item,
    @Request() req: any,
  ): Promise<Observable<UpdateResult>> {
    return this.itemsService.updateItem(itemId, item, req.user.pa_id);
  }

  /**
   * Deletes given item id (Provider must own this item)
   * @param itemId id of the item being updated
   * @param req token user to retrieve the id of the provider
   * @returns delete confirmation
   */
  @UseGuards(JwtGuard)
  @Delete('/delete/:i_id')
  deleteItem(
    @Param('i_id') itemId: number,
    @Body() item: Item,
    @Request() req: any,
  ): Promise<Observable<UpdateResult>> {
    return this.itemsService.deleteItem(itemId, item, req.user.pa_id);
  }
}
