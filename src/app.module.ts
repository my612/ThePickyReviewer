import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'database/entities/user.entity';
import { Reviews } from 'database/entities/reviews.entity';
import { Favorites } from 'database/entities/favorites.entity';
import { Films } from 'database/entities/films.entity';
import { Genre } from 'database/entities/genre.entity';
import { ToBeWatched } from 'database/entities/tobewatched.entity';
import { Followers } from 'database/entities/followers.entity';
import { UserModule } from './user/user.module';
import { FilmsModule } from './films/films.module';
import { ReviewModule } from './review/review.module';
import { AuthModule } from './auth/auth.module';
import { AdminService } from './admin/admin.service';
import { AdminModule } from './admin/admin.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [
          User,
          Reviews,
          Favorites,
          Films,
          Genre,
          ToBeWatched,
          Followers,
        ],
        synchronize: true,
        logging: true,
        autoLoadEntities: true,
      }),
    }),
    UserModule,
    FilmsModule,
    ReviewModule,
    AuthModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService, AdminService],
})
export class AppModule {}
