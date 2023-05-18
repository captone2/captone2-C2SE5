import { MovieShowtime } from "../movie/type";
import { Movie } from "../movie/type";
import { Seat } from "../movie/type";

export enum ActionType {
  GET_BOOKING_BY_BOOKING_CODE = "GET_BOOKING_BY_BOOKING_CODE",
  SET_TICKET_BOOKING_RECEIVED = "SET_TICKET_BOOKING_RECEIVED",
  SEAT_BOOKED_BY_SHOW_TIME = "SEAT_BOOKED_BY_SHOW_TIME",
  GET_ALL_FOOD = "GET_ALL_FOOD",
  GET_ALL_BOOKING_BY_ACCOUNT = "GET_ALL_BOOKING_BY_ACCOUNT",
}

export type BookingState = {
  data: {
    booking: any;
    seatBooked: number[];
    food: FoodResponse[];
    foodSelected: FoodResponse[];
    seatSelected: Seat[];
    bookedByAccount: BookingDTO[];
  };
  errors: any;
};

export type BookingRequest = {
  id: number;
  bookingCode: string;
};

export interface FoodResponse {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
}

export type BookingDTO = {
  id: number;
  dayTimeBooking: string;
  totalPrice: number;
  bookingCode: string;
  imgQrCode: string;
  seats: Seat[];
  received: boolean;
  payment: Payment;
  food: FoodResponse;
  movie: Movie;
  movieShowTime: MovieShowtime;
};

type Payment = {
  id: number;
  name: string;
};
