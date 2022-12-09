import { Body, Get, Param, Post, UseGuards } from "@nestjs/common";
import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { Observable } from "rxjs";
import { JwtGuard } from "src/UserAccount/auth/guards/jwt.guard";
import { DeepPartial } from "typeorm";
import { ArticleListEntity } from "./articleList.entity";
import { ArticleList } from "./articleList.interface";
import { ArticleListService } from "./articleList.service";

@Controller('articleList')
export class ArticleListController {
    constructor(private readonly articleService: ArticleListService) {}

    /**Gets all all the articles for one Request
     * 
     * @param req_id the target Request
     * @returns 
     */
    @Get(':req_id')
    getAllArticleLists(@Param('req_id') req_id: number): Promise<ArticleListEntity[]> {
      return this.articleService.getAllArticleLists(req_id);
    }

    // @Post()
    // insertArticleList(@Body() articleList: ArticleList[]): Observable<DeepPartial<ArticleList[]>> {
    //     return this.articleService.insertArticleList(articleList);
    // }
}

