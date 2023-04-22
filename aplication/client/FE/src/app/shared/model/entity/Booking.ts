import { Showtime } from './Showtime';
import {BookingSeat} from './BookingSeat';
import {Payment} from './Payment';
import {Promotion} from './Promotion';
import {Account} from './Account';
import { Food } from './Food';
import { Movie } from './Movie';

export class Booking {
  id: number;
  totalPrice: number;
  bookingCode: string;
  received: boolean;
  payment: Payment;
  food: Food;
  movie: Movie;
  Showtime: Showtime;
}
