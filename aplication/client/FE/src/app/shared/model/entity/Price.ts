import {Showtime} from './Showtime';
import {JsonProperty} from 'jsog-typescript';
import {MovieShowtime} from './MovieShowtime';

export class Price {
  id: number;
  time: string;
  day: string;
  is3D: boolean;
  price: number;
  showtimes: Showtime[];

  constructor(id: number, time: string, day: string, is3D: boolean, price: number, showtimes: Showtime[]) {
    this.id = id;
    this.time = time;
    this.day = day;
    this.is3D = is3D;
    this.price = price;
    this.showtimes = showtimes;
  }
}
