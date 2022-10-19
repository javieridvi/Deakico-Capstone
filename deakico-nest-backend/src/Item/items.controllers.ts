import { Controller, Post, Body, Get, Param, Put, Delete, HttpException, HttpStatus } from "@nestjs/common";
import { Observable } from "rxjs";
import { DeleteResult, UpdateResult } from "typeorm";
import { Item } from "./items.interface";
import { ItemsService } from "./items.service";

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) { }

  @Get()
  getAllItems(): Observable<Item[]> {
    return this.itemsService.getAllItems();
  }

  @Get('/id/:i_id')
  getItem(@Param('i_id') itemId: number,): Observable<Item> {
    return this.itemsService.getItem(itemId);
  }

  @Get('type/:i_type')
  getItemByType(@Param('i_type') itemType: string,): Observable<Item[]> {
    const types = ['product', 'service'];
    if (types.includes(itemType)) {
      return this.itemsService.getItemByType(itemType);
    } else {
      throw new HttpException('Not a type', HttpStatus.BAD_REQUEST)
    }
  }

  @Get('category')
  getItemCategories(): Promise<Partial<Item[]>> {
    return this.itemsService.getItemCategories();
  }

  @Get('category/:i_category')
  getItemByCategory(@Param('i_category') itemCategory: string,): Observable<Item[]> {
    return this.itemsService.getItemByCategory(itemCategory);
  }

  @Get('provider/:pa_id')
  getItemOfProvider(@Param('pa_id') itemProvider: number,): Observable<Item[]> {
    return this.itemsService.getItemOfProvider(itemProvider);
  }

  @Post()
  insertItem(@Body() item: Item): Observable<Item> {
    return this.itemsService.insertItem(item);
  }

  @Put('/id/:i_id')
  updateItem(
    @Param('i_id') itemId: number,
    @Body() item: Item,
  ): Observable<UpdateResult> {
    return this.itemsService.updateItem(itemId, item);
  }

  @Delete('/id/:i_id')
  deleteItem(
    @Param('i_id') itemId: number,): Observable<DeleteResult> {
    return this.itemsService.deleteItem(itemId);
  }
}