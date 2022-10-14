import { Controller, Post, Body, Get, Param, Put, Delete } from "@nestjs/common";
import { Observable } from "rxjs";
import { DeleteResult, UpdateResult } from "typeorm";
import { Item } from "./items.interface";
import { ItemsService } from "./items.service";

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    @Post()
    insertItem(@Body() item: Item): Observable<Item> {
        return this.itemsService.insertItem(item);
    }

    @Get()
    getAllItems(): Observable<Item[]>{
        return this.itemsService.getAllItems();
    }

    @Get(':i_id')
    getItem(@Param('i_id') itemId: number,): Observable<Item> {
        return this.itemsService.getItem(itemId);
    }

    @Put(':i_id')
    updateItem(
        @Param('i_id') itemId: number,
        @Body() item: Item,
    ): Observable<UpdateResult> {
        return this.itemsService.updateItem(itemId, item);
    }

    @Delete(':i_id')
    deleteItem(
        @Param('i_id') itemId: number,): Observable<DeleteResult> {
            return this.itemsService.deleteItem(itemId);
        }
}