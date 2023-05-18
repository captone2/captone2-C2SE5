import { Genre } from './../entity/Genre';
export class MovieDTO1 {
  id: number;
  title: string;
  cast: string;
  director: string;
  releaseDate: string;
  runningTime: number;
  production: string;
  trailerUrl: string;
  content: string;
  genre: number[];
  imgUrl: string;
}
