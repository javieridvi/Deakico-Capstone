import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from 'src/Item/items.module';
import { ItemsService } from 'src/Item/items.service';
import { ItemEntity } from '../Item/items.entity';
import { UserAccountEntity } from '../UserAccount/users.entity';
import { LikesController } from './likes.controllers';
import { LikeEntity } from './likes.entity';
import { LikesService } from './likes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LikeEntity, ItemEntity,ItemsService, UserAccountEntity]),
    ItemsModule,
  ],
  controllers: [LikesController],
  providers: [LikesService],
  exports: [LikesService],
})
export class LikesModule {}
