import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleListModule } from 'src/ArticleList/articleList.module';
import { ArticleListService } from 'src/ArticleList/articleList.service';
import { ArticleListEntity } from '../ArticleList/articleList.entity';
import { ItemEntity } from '../Item/items.entity';
import { UserAccountModule } from '../UserAccount/users.module';
import { ItemRequestController } from './requests.controllers';
import { RequestEntity } from './requests.entity';
import { RequestService } from './requests.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RequestEntity, 
      ItemEntity, 
      ArticleListEntity,
      ArticleListService
    ]),
    ArticleListModule,
    forwardRef(() => UserAccountModule)
  ],
  controllers: [ItemRequestController],
  providers: [RequestService],
  exports: [RequestService],
})
export class RequestModule {}
