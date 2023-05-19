import { createSlice } from "@reduxjs/toolkit";
import { MovieState } from "./type";
import {
  findAllGenres,
  findAllMovie,
  findAllMovieComingSoon,
  findAllMovieShowing,
  findMovieById,
  findShowtimeByMovieId,
  getFiveMovieHighestOfMonth,
  getRateByMovieId,
} from "./dispatcher";

const initialState: MovieState = {
  data: {
    movies: [],
    movieDetail: {
      id: 0,
      title: "",
      cast: "",
      director: "",
      releaseDate: "",
      runningTime: 0,
      production: "",
      trailerUrl: "",
      createAt: "",
      content: "",
      is3D: false,
      genres: [],
      comments: [],
      screen: {
        id: 0,
        name: "",
        totalSeat: 0,
        seats: [],
      },
      movieImages: [],
    },
    genre: [],
    movieShowing: [],
    movieComingSoon: [],
    movieShowtime: [],
    fiveMovieHighestOfMonth: [],
    rateByMovieId: 0,
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
    builder.addCase(getFiveMovieHighestOfMonth.fulfilled, (state, action) => {
      state.data.fiveMovieHighestOfMonth = action.payload;
    });
    builder.addCase(getRateByMovieId.fulfilled, (state, action) => {
      state.data.rateByMovieId = action.payload;
    });
  },
});

const movieReducer = movieSlice.reducer;
const { setMovieDetails } = movieSlice.actions;
export { movieReducer, setMovieDetails };
