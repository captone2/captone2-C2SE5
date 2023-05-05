import { MovieShowtime } from "../entity/MovieShowtime";


export class CommingSoonDTO {
    week: string;
    day: string;
    movieShowTime: MovieShowtime[];
    about: string;
  }
