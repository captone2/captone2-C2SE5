import { Showtime } from './Showtime';
import {BookingSeat} from './BookingSeat';
import {Payment} from './Payment';
import {Promotion} from './Promotion';
import {Account} from './Account';
import { Food } from './Food';
import { Movie } from './Movie';
import { Seat } from './Seat';
import { MovieShowtime } from './MovieShowtime';

export class Booking {
  id: number;
  dayTimeBooking: string;
  totalPrice: number;
  bookingCode: string;
  imgQrCode: string;
  seats: Seat[];
  received: boolean;
  payment: Payment;
  food: Food;
  movie: Movie;
  movieShowTime: MovieShowtime;
}
