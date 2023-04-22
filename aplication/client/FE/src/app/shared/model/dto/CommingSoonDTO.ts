import { MovieShowtime } from "../entity/MovieShowtime";


export class CommingSoonDTO {
    week: string;
    day: string;
    movie: MovieShowtime[];
    about: string;
  }
