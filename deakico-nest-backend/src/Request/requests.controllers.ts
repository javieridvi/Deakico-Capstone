import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { throws } from "assert";
import { Observable } from "rxjs";
import { ItemRequest } from "./requests.interface";
import { RequestService } from "./requests.service";

@Controller('requests')
export class ItemRequestController {
    constructor(private readonly requestsService: RequestService) {}

    @Post()
    insertRequest(@Body() itemRequest: ItemRequest): Observable<ItemRequest> {
        return this.requestsService.insertRequest(itemRequest);
    }

    @Get()
    getAllRequests(){
        return this.requestsService.getAllRequests();
    }

    @Get(':req_id')
    getRequest(@Param('req_id') req_Id: number,) {
        return this.requestsService.getRequest(req_Id);
    }
}