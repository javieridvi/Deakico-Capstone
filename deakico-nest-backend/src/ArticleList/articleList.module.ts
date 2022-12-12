import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemEntity } from '../Item/items.entity';
import { RequestEntity } from '../Request/requests.entity';
import { ArticleListController } from './articleList.controller';
import { ArticleListEntity } from './articleList.entity';
import { ArticleListService } from './articleList.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        ArticleListEntity,
        ItemEntity,
        RequestEntity,
    ]),
  ],
  controllers: [ArticleListController],
  providers: [ArticleListService],
  exports: [ArticleListService],
})
export class ArticleListModule {}
