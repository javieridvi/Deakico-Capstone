import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FollowsModule } from './Follows/follows.module';
import { ItemsModule } from './Item/items.module';
import { LikesModule } from './Likes/likes.module';
import { ProviderAccountModule } from './ProviderAccount/providers.module';
import { RequestModule } from './Request/requests.module';
import { ReviewModule } from './Review/reviews.module';
import { UserAccountModule } from './UserAccount/users.module';

@Module({
  imports: [ItemsModule, ProviderAccountModule, RequestModule, UserAccountModule,
    ReviewModule, LikesModule, FollowsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({ 
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
   ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
