import { Movie } from "../entity/Movie";
import { Showtime } from "../entity/Showtime";

export class MovieShowtimeDTO {
    id: number;
    showDate: string
    movie: Movie;
    showtime: Showtime[];
    screen : Screen;
  

    constructor(id: number, showDate: string, movie: Movie, showtime: Showtime[], screen: Screen) {
        this.id = id;
        this.showDate = showDate;
        this.movie = movie;
        this.showtime = showtime;
        this.screen = screen;
      }
  }

  
  