import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderAccountEntity } from '../ProviderAccount/providers.entity';
import { UserAccountEntity } from '../UserAccount/users.entity';
import { FollowsController } from './follows.controllers';
import { FollowEntity } from './follows.entity';
import { FollowsService } from './follows.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FollowEntity,
      UserAccountEntity,
      ProviderAccountEntity,
    ]),
  ],
  controllers: [FollowsController],
  providers: [FollowsService],
})
export class FollowsModule {}
