import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemEntity } from '../Item/items.entity';
import { UserAccountModule } from '../UserAccount/users.module';
import { ItemRequestController } from './requests.controllers';
import { RequestEntity } from './requests.entity';
import { RequestService } from './requests.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RequestEntity, ItemEntity, UserAccountModule]),
  ],
  controllers: [ItemRequestController],
  providers: [RequestService],
})
export class RequestModule {}
