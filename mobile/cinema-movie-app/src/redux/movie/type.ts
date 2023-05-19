export enum ActionType {
  FIND_ALL_MOVIE = "FIND_ALL_MOVIE",
  FIND_MOVIE_BY_ID = "FIND_MOVIE_BY_ID",
  FIND_ALL_GENRE = "FIND_ALL_GENRE",
  FIND_MOVIE_BY_SHOWING = "FIND_MOVIE_BY_SHOWING",
  FIND_MOVIE_BY_COMING_SOON = "FIND_MOVIE_BY_COMING_SOON",
  GET_SHOWTIME_MOVIE_BY_ID = "GET_SHOWTIME_MOVIE_BY_ID",
  GET_FIVE_MOVIE_HIGHEST_OF_MONTH = "GET_FIVE_MOVIE_HIGHEST_OF_MONTH",
}

export type MovieState = {
  data: {
    movies: Movie[];
    movieDetail?: Movie;
    movieShowing: Movie[];
    movieComingSoon: Movie[];
    genre: Genre[];
    movieShowtime: MovieShowtime[];
    fiveMovieHighestOfMonth: Movie[];
  };
  errors: any;
};

export interface Movie {
  id: number;
  title: string;
  cast: string;
  director: string;
  releaseDate: string;
  runningTime: number;
  production: string;
  trailerUrl: string;
  createAt: any;
  content: string;
  is3D: boolean;
  genres: Genre[];
  comments: any[];
  screen: Screen;
  movieImages: MovieImage[];
}

export interface Genre {
  id: number;
  name: string;
}

interface MovieImage {
  id: number;
  imageUrl: string;
}

export interface Showtime {
  id: number;
  showTime: string;
}

export interface Screen {
  id: number;
  name: string;
  totalSeat: number;
  seats: Seat[];
}

export interface Seat {
  id: number;
  vip: boolean;
  name: string;
}

export interface MovieShowtime {
  id: number;
  showDate: string;
  showtime: Showtime;
  movie: Movie;
  screen: Screen;
}
