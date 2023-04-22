import {Booking} from './Booking';
import {JsonProperty} from 'jsog-typescript';
import {MovieShowtime} from './MovieShowtime';

export class Promotion {
  id: number;
  title: string;
  description: string;
  promotionFrom: string;
  promotionTo: string;
  imageUrl: string;
  discount: number;
  bookings: Booking[];

  constructor(id: number, title: string, description: string, promotionFrom: string, promotionTo: string, imageUrl: string,
              discount: number, bookings: Booking[]) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.promotionFrom = promotionFrom;
    this.promotionTo = promotionTo;
    this.imageUrl = imageUrl;
    this.discount = discount;
    this.bookings = bookings;
  }
}
