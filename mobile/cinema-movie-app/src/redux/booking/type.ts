export enum ActionType {
  GET_BOOKING_BY_BOOKING_CODE = "GET_BOOKING_BY_BOOKING_CODE",
  SET_TICKET_BOOKING_RECEIVED = "SET_TICKET_BOOKING_RECEIVED",
  SEAT_BOOKED_BY_SHOW_TIME = "SEAT_BOOKED_BY_SHOW_TIME",
}

export type BookingState = {
  data: {
    booking: any;
    seatBooked: number[];
  };
  errors: any;
};

export type BookingRequest = {
  id: number;
  bookingCode: string;
};
