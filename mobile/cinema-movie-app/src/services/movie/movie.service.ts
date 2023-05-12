import { Endpoints } from "../../api/endpoints";
import { Genre, Movie, MovieShowtime } from "../../redux/movie/type";
import { responseBody } from "./../../api/axios";
import axios from "axios";

export class MovieService {
  static prefix = "auth/movie";
  static findAllMovie(keyword?: string): Promise<Movie[]> {
    return axios
      .get(Endpoints.PREFIX + `${this.prefix}/search-movie?keyword=${keyword}`)
      .then(responseBody);
  }

  static findAllMovieComingSoon(keyword?: string): Promise<Movie[]> {
    return axios
      .get(Endpoints.PREFIX + `${this.prefix}/movie-coming-soon`)
      .then(responseBody);
  }

  static findAllMovieShowing(keyword?: string): Promise<Movie[]> {
    return axios
      .get(Endpoints.PREFIX + `${this.prefix}/movie-showing`)
      .then(responseBody);
  }

  static findMovieById(id: number): Promise<Movie> {
    return axios
      .get(Endpoints.PREFIX + `${this.prefix}/detail-movie/${id}`)
      .then(responseBody);
  }

  static findAllGenres(): Promise<Genre[]> {
    return axios
      .get(Endpoints.PREFIX + `${this.prefix}-showtime/genre`)
      .then(responseBody);
  }

  static findShowtimeByMovieId(id: number): Promise<MovieShowtime[]> {
    return axios
      .get(Endpoints.PREFIX + `${this.prefix}-showtime/${id}`)
      .then(responseBody);
  }
}
