import { createSlice } from "@reduxjs/toolkit";
import { BookingState } from "./type";
import { getBookingByBookingCode, seatBookedByShowTime } from "./dispatcher";

const initialState: BookingState = {
  data: {
    booking: [],
    seatBooked: [],
  },
  errors: [],
};

const bookingSlice = createSlice({
  initialState: initialState,
  name: "booking",
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getBookingByBookingCode.fulfilled, (state, action) => {
      state.data.booking = action.payload;
    });
    builder.addCase(seatBookedByShowTime.fulfilled, (state, action) => {
      state.data.seatBooked = action.payload;
    });
  },
});

const bookingReducer = bookingSlice.reducer;
export { bookingReducer };
