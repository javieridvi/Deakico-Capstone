import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemEntity } from "src/Item/items.entity";
import { UserAccountModule } from "src/UserAccount/users.module";
import { ProviderAccountController } from "./providers.controlles";
import { ProviderAccountEntity } from "./providers.entity";
import { ProviderAccountService } from "./providers.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([ProviderAccountEntity, ItemEntity]), UserAccountModule
    ],
    controllers: [ProviderAccountController],
    providers:[ProviderAccountService],
})

export class ProviderAccountModule {}