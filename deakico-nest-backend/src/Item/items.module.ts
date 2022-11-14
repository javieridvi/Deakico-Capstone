import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemEntity } from './items.entity';
import { ItemsController } from './items.controllers';
import { ItemsService } from './items.service';
import { ProviderAccountEntity } from '../ProviderAccount/providers.entity';
import { RequestEntity } from '../Request/requests.entity';
import { ReviewEntity } from '../Review/reviews.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ItemEntity,
      ProviderAccountEntity,
      RequestEntity,
      ReviewEntity,
    ]),
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
