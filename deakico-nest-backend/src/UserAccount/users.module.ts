import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowsModule } from '../Follows/follows.module';
import { LikesModule } from '../Likes/likes.module';
import { ProviderAccountService } from '../ProviderAccount/providers.service';
import { ItemEntity } from '../Item/items.entity';
import { ProviderAccountEntity } from '../ProviderAccount/providers.entity';
import { RequestEntity } from '../Request/requests.entity';
import { ReviewEntity } from '../Review/reviews.entity';
import { UserAccountController } from './users.controllers';
import { UserAccountEntity } from './users.entity';
import { UserAccountService } from './users.service';
import { LikesService } from '../Likes/likes.service';
import { FollowsService } from '../Follows/follows.service';
import { ProviderAccountModule } from '../ProviderAccount/providers.module';
import { RequestModule } from '../Request/requests.module';
import { RequestService } from '../Request/requests.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserAccountEntity,
      ProviderAccountEntity,
      ItemEntity,
      ReviewEntity,
      RequestEntity,
      ProviderAccountService,
      LikesService,
      FollowsService,
      RequestService,
    ]),
    LikesModule,
    FollowsModule,
    forwardRef(() => RequestModule),
    forwardRef(() => ProviderAccountModule),
  ],
  controllers: [UserAccountController],
  providers: [UserAccountService],
  exports: [UserAccountService],
})
export class UserAccountModule {}
