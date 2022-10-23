import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemEntity } from "src/Item/items.entity";
import { ProviderAccountEntity } from "src/ProviderAccount/providers.entity";
import { RequestEntity } from "src/Request/requests.entity";
import { ReviewEntity } from "src/Review/reviews.entity";
import { UserAccountController } from "./users.controllers";
import { UserAccountEntity } from "./users.entity";
import { UserAccountService } from "./users.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserAccountEntity, ProviderAccountEntity, ItemEntity, ReviewEntity, RequestEntity])
    ],
    controllers: [UserAccountController],
    providers:[UserAccountService],
})

export class UserAccountModule {}