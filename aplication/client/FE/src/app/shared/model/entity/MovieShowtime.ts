import { Screen } from './Screen';
import {Movie} from './Movie';
import {Showtime} from './Showtime';
import {JsonProperty} from 'jsog-typescript';

export class MovieShowtime {
  id: number;
  showDate: string
  movie: Movie;
  showtime: Showtime;
  screen : Screen;

}
