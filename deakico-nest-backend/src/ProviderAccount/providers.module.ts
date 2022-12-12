import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccountService } from 'src/UserAccount/users.service';
import { FollowsModule } from '../Follows/follows.module';
import { FollowsService } from '../Follows/follows.service';
import { ItemsModule } from '../Item/items.module';
import { ItemsService } from '../Item/items.service';
import { LikesModule } from '../Likes/likes.module';
import { LikesService } from '../Likes/likes.service';
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
    forwardRef(() => UserAccountModule),
  ],
  controllers: [ProviderAccountController],
  providers: [ProviderAccountService],
  exports: [ProviderAccountService],
})
export class ProviderAccountModule {}
