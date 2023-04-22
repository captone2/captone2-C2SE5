import {Booking} from './Booking';
import {JsonProperty} from 'jsog-typescript';
import {MovieShowtime} from './MovieShowtime';

export class Payment {
  id: number;
  name: string;
  bookings: Booking[];

  constructor(id: number, name: string, bookings: Booking[]) {
    this.id = id;
    this.name = name;
    this.bookings = bookings;
  }
}
