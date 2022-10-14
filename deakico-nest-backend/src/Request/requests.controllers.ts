import { Controller, Post, Body, Get, Param, Put, Delete } from "@nestjs/common";
import { throws } from "assert";
import { request } from "http";
import { Observable } from "rxjs";
import { DeleteResult, UpdateResult } from "typeorm";
import { RequestEntity } from "./requests.entity";
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
    getAllRequests(): Observable<ItemRequest[]>{
        return this.requestsService.getAllRequests();
    }

    @Get(':req_id')
    getRequest(@Param('req_id') req_Id: number,): Observable<ItemRequest> {
        return this.requestsService.getRequest(req_Id);
    }

    @Put(':req_id')
    updateRequest(
        @Param('req_id') req_Id: number,
        @Body() itemRequest: ItemRequest,
    ): Observable<UpdateResult> {
        return this.requestsService.updateRequest(req_Id, itemRequest);
    }

    @Delete(':req_id')
    deleteRequest(
        @Param('req_id') req_Id: number,): Observable<DeleteResult> {
            return this.requestsService.deleteRequest(req_Id);
    }
}