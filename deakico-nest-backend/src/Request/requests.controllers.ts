import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtGuard } from "src/UserAccount/auth/guards/jwt.guard";
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
   * Fetches list of request of logged in provider
   * @param req token user used to retrieve id of provider
   * @returns list of requests and items
   */
  @UseGuards(JwtGuard)
  @Get('of/provider')
  getProviderRequest(@Request() req: any) {
    return this.requestsService.getProviderRequest(req.user.pa_id);
  }

  /**
   * Fetches list of request of logged in user
   * @param req token user used to retrieve id of user
   * @returns list of requests and items
   */
  @UseGuards(JwtGuard)
  @Get('of/user')
  getUserRequest(@Request() req: any) {
    return this.requestsService.getUserRequest(req.user.u_id);
  }

  @UseGuards(JwtGuard)
  @Post()
  insertRequest(@Body() itemRequest: ItemRequest, @Request() req: any): Observable<ItemRequest> {
    return this.requestsService.insertRequest(req.user, itemRequest);
  }

  /**
   * Updates user's request
   * @param req_Id id of request
   * @param itemRequest info to be updated
   * @param req token used to retrieve user id
   * @returns update confirmation
   */
  @UseGuards(JwtGuard)
  @Put(':req_id')
  updateRequest(
    @Param('req_id') req_Id: number,
    @Body() itemRequest: ItemRequest,
    @Request() req: any,
  ): Promise<Observable<UpdateResult>> {
    return (this.requestsService.updateRequest(req_Id, itemRequest, req.user.u_id));
  }

  /**
   * Deletes user's request
   * @param req_Id resquest id
   * @param req token used to retrieve user id
   * @returns deletes confirmation
   */
  @UseGuards(JwtGuard)
  @Delete(':req_id')
  deleteRequest(
    @Param('req_id') req_Id: number, @Request() req: any,): Promise<Observable<DeleteResult>> {
    return this.requestsService.deleteRequest(req_Id, req.user.u_id);
  }
}