import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
import { UserAccount } from "src/UserAccount/users.interface";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { RequestEntity } from "./requests.entity";
import { ItemRequest } from "./requests.interface";

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(RequestEntity)
    private readonly requestRepository: Repository<RequestEntity>
  ) { }

  getAllRequests(): Observable<ItemRequest[]> { return from(this.requestRepository.find()) }

  getRequest(req_id): Observable<ItemRequest> {
    return from(this.requestRepository.findOneBy(
      { req_id: req_id, }
    ))
  }

  async getProviderRequest(providerId: number) {

    const res = await this.requestRepository
    .createQueryBuilder("request")
    .innerJoin("request.item", "item")
    .where("item.pa_id = :pa_id", {pa_id: providerId})
    .getRawMany()

    return res;
  }

  async getUserRequest(userId: number) {

    const res = await this.requestRepository
    .createQueryBuilder("request")
    .innerJoin("request.item", "item")
    .where("item.u_id = :u_id", {u_id: userId})
    .getRawMany()

    return res;
  }

  insertRequest(user: UserAccount, itemRequest: ItemRequest): Observable<ItemRequest> { 
    itemRequest.u_id = user.u_id;
    return from(this.requestRepository.save(itemRequest)); 
  }

  async updateRequest(requestId: number, request: ItemRequest, userId: number): Promise<Observable<UpdateResult>> {
    //check if request exists and belongs to user
    await this.requestRepository.findOneOrFail({select:{ req_id: true}, where: { req_id: requestId, u_id: userId}});
    return from(this.requestRepository.update(requestId, request));
  }

  async deleteRequest(requestId: number, userId: number): Promise<Observable<DeleteResult>> {
    //check if request exists and belongs to user
    await this.requestRepository.findOneOrFail({select:{ req_id: true}, where: { req_id: requestId, u_id: userId}});
    return from(this.requestRepository.delete(requestId))
  }
}