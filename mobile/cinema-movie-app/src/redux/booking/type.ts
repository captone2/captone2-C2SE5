import { Seat } from "../movie/type";

export enum ActionType {
  GET_BOOKING_BY_BOOKING_CODE = "GET_BOOKING_BY_BOOKING_CODE",
  SET_TICKET_BOOKING_RECEIVED = "SET_TICKET_BOOKING_RECEIVED",
  SEAT_BOOKED_BY_SHOW_TIME = "SEAT_BOOKED_BY_SHOW_TIME",
  GET_ALL_FOOD = "GET_ALL_FOOD",
}

export type BookingState = {
  data: {
    booking: any;
    seatBooked: number[];
    food: FoodResponse[];
    foodSelected: FoodResponse[];
    seatSelected: Seat[];
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
