import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { FilmsService } from './films.service';
import { FilmDto, FilmDto_Update } from './films.dto';
import { Films } from 'database/entities/films.entity';
import { Reviews } from 'database/entities/reviews.entity';
import { Genre } from 'database/entities/genre.entity';
import { AuthGuard } from 'src/auth/auth.guard';
@ApiTags('Films')
@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}
  @ApiBearerAuth('Bearer')
  @UseGuards(AuthGuard)
  @Post('/add')
  @ApiBody({ type: FilmDto })
  async addFilm(@Body() film: FilmDto): Promise<boolean> {
    return this.filmsService.addFilm(film);
  }

  @Get('/get')
  async getRecordById(@Query('id') id: number): Promise<Films> {
    const result = await this.filmsService.getFilmById(id);
    return result;
  }

  @Delete('/delete')
  async deleteRecordById(@Query('id') id: number): Promise<boolean> {
    return this.filmsService.deleteFilmById(id);
  }

  @Patch('/update')
  @ApiBody({ type: FilmDto_Update })
  async updateRecordById(@Body() entry: FilmDto_Update): Promise<boolean> {
    return this.filmsService.updateFilmByID(entry);
  }

  @Get('/reviews')
  async getReviews(@Query('id') id: number): Promise<Reviews[]> {
    return this.filmsService.getReviews(id);
  }

  @Get('/rating')
  async getAverageRating(@Query('id') id: number): Promise<number> {
    return this.filmsService.calculateAverageRating(id);
  }
  @Get('/title')
  async getFilmByTitle(@Query('title') title: string): Promise<Films> {
    return this.filmsService.getFilmByTitle(title);
  }
  @Post('addfavorite')
  async addToFavorites(
    @Query('filmId') filmId: number,
    @Query('userId') userId: number,
  ): Promise<boolean> {
    return this.filmsService.addToFavorites(filmId, userId);
  }

  @Post('addtobewatched')
  async addToBeWatched(
    @Query('filmId') filmId: number,
    @Query('userId') userId: number,
  ): Promise<boolean> {
    return this.filmsService.addToBeWatched(filmId, userId);
  }
  @Post('addgenre')
  async addGenre(
    @Query('filmId') filmId: number,
    @Query('genre') genre: string,
  ): Promise<boolean> {
    return this.filmsService.addGenre(filmId, genre);
  }

  @Get('getgenres')
  async getGenres(@Query('filmId') filmId: number): Promise<Genre[]> {
    return this.filmsService.getGenres(filmId);
  }
}
