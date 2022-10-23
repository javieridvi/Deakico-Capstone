import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProviderAccountEntity } from "src/ProviderAccount/providers.entity";
import { UserAccountEntity } from "src/UserAccount/users.entity";
import { FollowsController } from "./follows.controller";
import { FollowEntity } from "./follows.entity";
import { FollowsService } from "./follows.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([FollowEntity, UserAccountEntity, ProviderAccountEntity])
    ],
    controllers: [FollowsController],
    providers:[FollowsService],
})

export class FollowsModule {}