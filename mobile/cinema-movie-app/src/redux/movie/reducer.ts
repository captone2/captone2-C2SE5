import { createSlice } from "@reduxjs/toolkit";
import { MovieState } from "./type";
import { findAllMovie, findMovieById } from "./dispatcher";

const initialState: MovieState = {
  data: {
    movies: [],
    movieDetail: undefined,
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
  },
});

const movieReducer = movieSlice.reducer;
const { setMovieDetails } = movieSlice.actions;
export { movieReducer, setMovieDetails };
