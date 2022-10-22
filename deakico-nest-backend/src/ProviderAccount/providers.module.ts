import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemEntity } from "src/Item/items.entity";
import { RequestEntity } from "src/Request/requests.entity";
import { ProviderAccountController } from "./providers.controlles";
import { ProviderAccountEntity } from "./providers.entity";
import { ProviderAccountService } from "./providers.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([ProviderAccountEntity, ItemEntity])
    ],
    controllers: [ProviderAccountController],
    providers:[ProviderAccountService],
})

export class ProviderAccountModule {}