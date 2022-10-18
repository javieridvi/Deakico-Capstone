import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemEntity } from "src/Item/items.entity";
import { ProviderAccountEntity } from "src/ProviderAccount/providers.entity";
import { ReviewEntity } from "src/Review/reviews.entity";
import { UserAccountEntity } from "src/UserAccount/users.entity";
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