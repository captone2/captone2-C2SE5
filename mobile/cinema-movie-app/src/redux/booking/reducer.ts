import { createSlice } from "@reduxjs/toolkit";
import { BookingState } from "./type";
import { getAllBookingByAccount, getAllFood, getBookingByBookingCode, seatBookedByShowTime } from "./dispatcher";

const initialState: BookingState = {
  data: {
    booking: [],
    seatBooked: [],
    food: [],
    foodSelected: [],
    seatSelected: [],
    bookedByAccount: [],
  },
  errors: [],
};

const bookingSlice = createSlice({
  initialState: initialState,
  name: "booking",
  reducers: {
    setSeatSelected: (state, data) => {
      state.data.seatSelected = data.payload;
    },
    setFoodSelected: (state, data) => {
      state.data.foodSelected = data.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getBookingByBookingCode.fulfilled, (state, action) => {
      state.data.booking = action.payload;
    });
    builder.addCase(seatBookedByShowTime.fulfilled, (state, action) => {
      state.data.seatBooked = action.payload;
    });
    builder.addCase(getAllFood.fulfilled, (state, action) => {
      state.data.food = action.payload.map((el) => {
        return { ...el, quantity: 0 };
      });
    });
    builder.addCase(getAllBookingByAccount.fulfilled, (state, action) => {
      state.data.bookedByAccount = action.payload;
    });
  },
});

const bookingReducer = bookingSlice.reducer;
export const { setSeatSelected, setFoodSelected } = bookingSlice.actions;
export { bookingReducer };
