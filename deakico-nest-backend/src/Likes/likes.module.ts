import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemEntity } from '../Item/items.entity';
import { UserAccountEntity } from '../UserAccount/users.entity';
import { LikesController } from './likes.controllers';
import { LikeEntity } from './likes.entity';
import { LikesService } from './likes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LikeEntity, ItemEntity, UserAccountEntity]),
  ],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
