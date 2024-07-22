import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Films } from 'database/entities/films.entity';
import { In, Repository } from 'typeorm';
import { FilmDto, FilmDto_Update } from './films.dto';
import { Reviews } from 'database/entities/reviews.entity';
import { Favorites } from 'database/entities/favorites.entity';
import { ToBeWatched } from 'database/entities/tobewatched.entity';
import { Genre } from 'database/entities/genre.entity';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Films)
    private film: Repository<Films>,
    @InjectRepository(Favorites)
    private fav: Repository<Favorites>,
    @InjectRepository(ToBeWatched)
    private toBeWatched: Repository<ToBeWatched>,
    @InjectRepository(Genre)
    private genres: Repository<Genre>,
  ) {}
  async addFilm(film: FilmDto): Promise<boolean> {
    const result = await this.film.save(film);
    return result ? true : false;
  }

  async getFilmById(id: number): Promise<Films> {
    return this.film.findOne({ where: { id } });
  }

  async deleteFilmById(id: number): Promise<boolean> {
    const result = await this.film.delete(id);
    return result.affected > 0;
  }

  async updateFilmByID(entry: FilmDto_Update): Promise<boolean> {
    const result = await this.film.update(entry.id, entry);
    return result.affected > 0;
  }
  async getReviews(filmId: number): Promise<Reviews[]> {
    const film = await this.film.findOne({
      where: { id: filmId },
      relations: ['reviews'],
    });
    return film ? film.reviews : [];
  }
  async calculateAverageRating(filmId: number): Promise<number> {
    const revs = await this.getReviews(filmId);
    if (revs.length === 0) {
      return 0;
    }
    let sum = 0;
    for (let i = 0; i < revs.length; i++) {
      sum += revs[i].rating;
    }
    return sum / revs.length;
  }
  async getFilmByTitle(title: string): Promise<Films> {
    return this.film.findOne({ where: { title } });
  }

  async addToFavorites(filmId: number, userId: number): Promise<boolean> {
    const result = await this.fav.insert({ filmId, userId });
    return result.identifiers.length > 0;
  }
  async addToBeWatched(filmId: number, userId: number): Promise<boolean> {
    const result = await this.toBeWatched.insert({ filmId, userId });
    return result.identifiers.length > 0;
  }
  async addGenre(filmId: number, genre: string): Promise<boolean> {
    const result = await this.genres.insert({ filmId, genre });
    return result.identifiers.length > 0;
  }
  async getGenres(filmId: number): Promise<Genre[]> {
    let gens: string[];
    const result = await this.genres.find({
      select: { genre: true },
      where: { filmId: filmId },
    });
    // (result).forEach((result) => {
    //   gens.push(result.genre);
    // });
    
    return result;
  }
}
