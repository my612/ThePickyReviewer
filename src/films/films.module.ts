import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { Films } from 'database/entities/films.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorites } from 'database/entities/favorites.entity';
import { ToBeWatched } from 'database/entities/tobewatched.entity';
import { Genre } from 'database/entities/genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Films]), TypeOrmModule.forFeature([Favorites]), TypeOrmModule.forFeature([ToBeWatched]), TypeOrmModule.forFeature([Genre])],
  providers: [FilmsService],
  controllers: [FilmsController]
})
export class FilmsModule {}
