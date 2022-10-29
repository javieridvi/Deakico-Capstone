import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemEntity } from "../Item/items.entity";
import { ProviderAccountEntity } from "../ProviderAccount/providers.entity";
import { RequestEntity } from "../Request/requests.entity";
import { ReviewEntity } from "../Review/reviews.entity";
import { UserAccountController } from "./users.controllers";
import { UserAccountEntity } from "./users.entity";
import { UserAccountService } from "./users.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserAccountEntity, ProviderAccountEntity, ItemEntity, ReviewEntity, RequestEntity])
    ],
    controllers: [UserAccountController],
    providers:[UserAccountService],
    exports: [UserAccountService]
})

export class UserAccountModule {}