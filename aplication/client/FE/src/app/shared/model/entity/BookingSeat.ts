import {Booking} from './Booking';
import {Seat} from './Seat';
import {JsonProperty} from 'jsog-typescript';
import {MovieShowtime} from './MovieShowtime';

export class BookingSeat {
  booking: Booking;
  seat: Seat;

  constructor(booking: Booking, seat: Seat) {
    this.booking = booking;
    this.seat = seat;
  }
}
