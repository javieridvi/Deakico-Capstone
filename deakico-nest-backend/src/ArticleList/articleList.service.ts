import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
import { DeepPartial, Repository } from "typeorm";
import { ArticleListEntity } from "./articleList.entity";
import { ArticleList } from "./articleList.interface";

@Injectable()
export class ArticleListService {
  constructor(
    @InjectRepository(ArticleListEntity)
    private readonly articleListRepository: Repository<ArticleListEntity>,
  ) {}

  async getAllArticleLists(reqId: number): Promise<ArticleListEntity[]> {
    const res = await this.articleListRepository
        .createQueryBuilder()
        .select('*')
        .where('req_id = :req_id', {req_id: reqId})
        .getRawMany();
    return res;
  }

  /**Inserts many artileList objects into de database.
   * This is a helper method for Request entity.
   * 
   * @param articleList a list of ArticleList objects
   * @returns insertion of many ArticleList objects into database.
   */
  insertArticleList(articleList: ArticleList[]): Observable<DeepPartial<ArticleList[]>> {
    return from(this.articleListRepository.save(articleList));
  }

}