import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { UserAccount } from '../UserAccount/users.interface';
import { DataSource, DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { RequestEntity } from './requests.entity';
import { ItemRequest } from './requests.interface';
import { ArticleList } from 'src/ArticleList/articleList.interface';
import { ArticleListService } from 'src/ArticleList/articleList.service';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(RequestEntity)
    private readonly requestRepository: Repository<RequestEntity>,
  ) {}
  @Inject(ArticleListService)
  private readonly articleListService: ArticleListService;

  getAllRequests(): Observable<ItemRequest[]> {
    return from(this.requestRepository.find({where: {disabled: false}}));
  }

  getRequest(req_id): Observable<ItemRequest> {
    return from(this.requestRepository.findOneBy({ req_id: req_id, disabled: false }));
  }

  async getProviderRequest(providerId: number) {
    const res = await this.requestRepository
      .createQueryBuilder('request')
      .innerJoin('request.user', 'user', 'user.u_id = request.u_id')
      .select('request.req_id', 'req_id')
      .addSelect('request.req_totalprice', 'total')
      .addSelect('request.req_date', 'date')
      .addSelect('request.status', 'status')
      .addSelect('user.username', 'username')
      .addSelect('user.email', 'email')
      .where('request.pa_id = :pa_id', { pa_id: providerId })
      .andWhere('request.disabled = false')
      .getRawMany();

    return res;
  }

  //item will not be found due to ArticleList entity
  async getUserRequest(userId: number) {
    const res = await this.requestRepository
      .createQueryBuilder('request')
      .innerJoin('request.provider', 'provider')
      .select('request.req_id', 'req_id')
      .addSelect('request.req_totalprice', 'total')
      .addSelect('request.req_date', 'date')
      .addSelect('request.status', 'status')
      .addSelect('provider.pa_companyname', 'company_name')
      .where('request.u_id = :u_id', { u_id: userId }) 
      .andWhere('request.disabled = false')
      .getRawMany();

    return res;
  }

  async insertRequest(user: UserAccount, itemRequest: ItemRequest, articleList: ArticleList[]): Promise<InsertResult> {
    itemRequest.u_id = user.u_id;
    const request = (await this.requestRepository.insert(itemRequest)).raw;
    articleList = articleList.map(a => ({...a, req_id: request[0].req_id}));
    this.articleListService.insertArticleList(articleList)
    return request;
  }

  async updateRequestByUser(
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

  async updateRequestByProvider(
    requestId: number,
    request: ItemRequest,
    providerId: number,
  ): Promise<Observable<UpdateResult>> {
    //check if request exists and belongs to user
    await this.requestRepository.findOneOrFail({
      select: { req_id: true },
      where: { req_id: requestId, pa_id: providerId, disabled: false },
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
