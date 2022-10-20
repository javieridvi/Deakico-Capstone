import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemEntity } from "src/Item/items.entity";
import { UserAccountEntity } from "src/UserAccount/users.entity";
import { ItemRequestController } from "./requests.controllers";
import { RequestEntity } from "./requests.entity";
import { RequestService } from "./requests.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([RequestEntity, ItemEntity, UserAccountEntity])
    ],
    controllers: [ItemRequestController],
    providers:[RequestService],
})

export class RequestModule {}