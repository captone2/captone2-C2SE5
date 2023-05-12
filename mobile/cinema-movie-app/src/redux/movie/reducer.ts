import { createSlice } from "@reduxjs/toolkit";
import { MovieState } from "./type";
import {
  findAllGenres,
  findAllMovie,
  findAllMovieComingSoon,
  findAllMovieShowing,
  findMovieById,
  findShowtimeByMovieId,
} from "./dispatcher";

const initialState: MovieState = {
  data: {
    movies: [],
    movieDetail: undefined,
    genre: [],
    movieShowing: [],
    movieComingSoon: [],
    movieShowtime: [],
  },
  errors: [],
};

const movieSlice = createSlice({
  initialState: initialState,
  name: "movie",
  reducers: {
    setMovieDetails: (state, data) => {
      state.data.movieDetail = data.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(findAllMovie.fulfilled, (state, action) => {
      state.data.movies = action.payload;
    });
    builder.addCase(findMovieById.fulfilled, (state, action) => {
      state.data.movieDetail = action.payload;
    });
    builder.addCase(findAllGenres.fulfilled, (state, action) => {
      state.data.genre = action.payload;
    });
    builder.addCase(findAllMovieShowing.fulfilled, (state, action) => {
      state.data.movieShowing = action.payload;
    });
    builder.addCase(findAllMovieComingSoon.fulfilled, (state, action) => {
      state.data.movieComingSoon = action.payload;
    });
    builder.addCase(findShowtimeByMovieId.fulfilled, (state, action) => {
      state.data.movieShowtime = action.payload;
    });
  },
});

const movieReducer = movieSlice.reducer;
const { setMovieDetails } = movieSlice.actions;
export { movieReducer, setMovieDetails };
