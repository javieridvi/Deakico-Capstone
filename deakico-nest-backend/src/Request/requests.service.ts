import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { UserAccount } from '../UserAccount/users.interface';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { RequestEntity } from './requests.entity';
import { ItemRequest } from './requests.interface';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(RequestEntity)
    private readonly requestRepository: Repository<RequestEntity>,
  ) {}

  getAllRequests(): Observable<ItemRequest[]> {
    return from(this.requestRepository.find({where: {disabled: false}}));
  }

  getRequest(req_id): Observable<ItemRequest> {
    return from(this.requestRepository.findOneBy({ req_id: req_id, disabled: false }));
  }

  async getProviderRequest(providerId: number) {
    const res = await this.requestRepository
      .createQueryBuilder('request')
      .innerJoin('request.item', 'item', 'item.i_id = request.i_id')
      .innerJoin('request.user', 'user', 'user.u_id = request.u_id')
      .select('request.req_id', 'req_id')
      .addSelect('request.req_totalprice', 'total')
      .addSelect('request.req_date', 'date')
      .addSelect('user.username', 'username')
      .addSelect('user.email', 'email')
      .addSelect('item.i_name', 'item_name')
      .where('item.pa_id = :pa_id', { pa_id: providerId })
      .andWhere('request.disabled = false')
      .getRawMany();

    return res;
  }

  async getUserRequest(userId: number) {
    const res = await this.requestRepository
      .createQueryBuilder('request')
      .innerJoin('request.item', 'item')
      .where('item.u_id = :u_id', { u_id: userId })
      .andWhere('request.disabled = false')
      .getRawMany();

    return res;
  }

  insertRequest(
    user: UserAccount,
    itemRequest: ItemRequest,
  ): Observable<ItemRequest> {
    itemRequest.u_id = user.u_id;
    return from(this.requestRepository.save(itemRequest));
  }

  async updateRequest(
    requestId: number,
    request: ItemRequest,
    userId: number,
  ): Promise<Observable<UpdateResult>> {
    //check if request exists and belongs to user
    await this.requestRepository.findOneOrFail({
      select: { req_id: true },
      where: { req_id: requestId, u_id: userId, disabled: false },
    });
    return from(this.requestRepository.update(requestId, request));
  }

  async deleteRequest(
    requestId: number,
    userId: number,
  ): Promise<Observable<UpdateResult>> {
    //check if request exists and belongs to user
    await this.requestRepository.findOneOrFail({
      select: { req_id: true },
      where: { req_id: requestId, u_id: userId, disabled: false },
    });
    return from(this.requestRepository.update(requestId, {disabled: true}));
  }

  async unableUserRequests(userId: number): Promise<UpdateResult> {
    await this.requestRepository.findOneOrFail({
      select: {req_id: true},
      where: {u_id: userId}, //disabled check might not be necessary here
    });
    this.requestRepository
    .createQueryBuilder()
    .update(RequestEntity)
    .set({status: 'user not found'})
    .where('u_id = :u_id', {u_id: userId})
    .execute();
    return;
  }

}
