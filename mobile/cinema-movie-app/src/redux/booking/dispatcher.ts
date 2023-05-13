import { createAsyncThunk } from "@reduxjs/toolkit";
import { ActionType, BookingRequest } from "./type";
import { BookingService } from "../../services/booking/booking.service";

const getBookingByBookingCode = createAsyncThunk(
  ActionType.GET_BOOKING_BY_BOOKING_CODE,
  async (body: BookingRequest) => {
    return (await BookingService.getBookingByBookingCode(body)) ?? [];
  }
);

const setTicketBookingReceived = createAsyncThunk(
  ActionType.SET_TICKET_BOOKING_RECEIVED,
  async (body: BookingRequest) => {
    await BookingService.setTicketBookingReceived(body);
  }
);

const seatBookedByShowTime = createAsyncThunk(ActionType.SEAT_BOOKED_BY_SHOW_TIME, async (id: number) => {
  return (await BookingService.seatBookedByShowTime(id)) ?? [];
});

export { getBookingByBookingCode, setTicketBookingReceived, seatBookedByShowTime };
