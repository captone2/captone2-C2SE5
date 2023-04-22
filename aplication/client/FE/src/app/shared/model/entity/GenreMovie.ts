import {Genre} from './Genre';
import {Movie} from './Movie';

export class GenreMovie {
  genre: Genre;
  movie: Movie;

  constructor(genre: Genre, movie: Movie) {
    this.genre = genre;
    this.movie = movie;
  }
}
