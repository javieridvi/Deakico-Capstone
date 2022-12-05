import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowsModule } from 'src/Follows/follows.module';
import { FollowsService } from 'src/Follows/follows.service';
import { ItemsModule } from 'src/Item/items.module';
import { ItemsService } from 'src/Item/items.service';
import { LikesModule } from 'src/Likes/likes.module';
import { LikesService } from 'src/Likes/likes.service';
import { UserAccountModule } from '../UserAccount/users.module';
import { ProviderAccountController } from './providers.controllers';
import { ProviderAccountEntity } from './providers.entity';
import { ProviderAccountService } from './providers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProviderAccountEntity, 
      ItemsService,
      LikesService,
      FollowsService,
    ]),
    ItemsModule,
    LikesModule,
    FollowsModule,
    UserAccountModule,
  ],
  controllers: [ProviderAccountController],
  providers: [ProviderAccountService],
})
export class ProviderAccountModule {}
