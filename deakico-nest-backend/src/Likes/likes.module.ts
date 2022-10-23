import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemEntity } from "src/Item/items.entity";
import { UserAccountEntity } from "src/UserAccount/users.entity";
import { LikesController } from "./likes.controller";
import { LikeEntity } from "./likes.entity";
import { LikesService } from "./likes.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([LikeEntity, ItemEntity, UserAccountEntity])
    ],
    controllers: [LikesController],
    providers:[LikesService],
})

export class LikesModule {}