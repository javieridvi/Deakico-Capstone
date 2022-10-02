import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { throws } from "assert";
import { Observable } from "rxjs";
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
    getAllItems(){
        return this.itemsService.getAllItems();
    }

    @Get(':i_id')
    getItem(@Param('i_id') itemId: number,) {
        return this.itemsService.getItem(itemId);
    }
}