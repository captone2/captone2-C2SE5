import { Endpoints } from "../../api/endpoints";
import { Genre, Movie } from "../../redux/movie/type";
import { responseBody } from "./../../api/axios";
import axios from "axios";

export class MovieService {
  static prefix = "auth/movie";
  static findAllMovie(keyword?: string): Promise<Movie[]> {
    return axios
      .get(Endpoints.PREFIX + `${this.prefix}/search-movie?keyword=${keyword}`)
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
}
