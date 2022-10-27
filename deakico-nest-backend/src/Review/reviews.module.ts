import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemEntity } from "../Item/items.entity";
import { ProviderAccountEntity } from "../ProviderAccount/providers.entity";
import { ReviewEntity } from "../Review/reviews.entity";
import { UserAccountEntity } from "../UserAccount/users.entity";
import { ReviewController } from "./reviews.controllers";
import { ReviewService } from "./reviews.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([ReviewEntity, ProviderAccountEntity, ItemEntity, UserAccountEntity ])
    ],
    controllers: [ReviewController],
    providers:[ReviewService],
})

export class ReviewModule {}