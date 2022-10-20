import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Observable } from "rxjs";
import { DeleteResult, UpdateResult } from "typeorm";
import { ItemRequest } from "./requests.interface";
import { RequestService } from "./requests.service";

@Controller('requests')
export class ItemRequestController {
  constructor(private readonly requestsService: RequestService) { }

  @Get()
  getAllRequests(): Observable<ItemRequest[]> {
    return this.requestsService.getAllRequests();
  }

  @Get(':req_id')
  getRequest(@Param('req_id') req_Id: number,): Observable<ItemRequest> {
    return this.requestsService.getRequest(req_Id);
  }

  /**
   * Fetches list of request of given provider
   * @param providerId int id of provider
   * @returns list of requests
   */
  @Get('provider/:pa_id')
  getProviderRequest(@Param('pa_id') providerId: number) {
    return this.requestsService.getProviderRequest(providerId);
  }

  @Post()
  insertRequest(@Body() itemRequest: ItemRequest): Observable<ItemRequest> {
    return this.requestsService.insertRequest(itemRequest);
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