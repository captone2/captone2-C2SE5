export enum ActionType {
  FIND_ALL_MOVIE = "FIND_ALL_MOVIE",
  FIND_MOVIE_BY_ID = "FIND_MOVIE_BY_ID",
}

export type MovieState = {
  data: {
    movies: Movie[];
    movieDetail?: any;
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
  movieImages: MovieImage[];
}

interface Genre {
  id: number;
  name: string;
}

interface MovieImage {
  id: number;
  imageUrl: string;
}
