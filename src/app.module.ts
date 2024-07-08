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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '5057',
      database: 'reviewerdb',
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
