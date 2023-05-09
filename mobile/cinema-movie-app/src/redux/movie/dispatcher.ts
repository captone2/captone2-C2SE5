import { createAsyncThunk } from "@reduxjs/toolkit";
import { ActionType } from "./type";
import { MovieService } from "../../services/movie/movie.service";

const findAllMovie = createAsyncThunk(
  ActionType.FIND_ALL_MOVIE,
  async (title: string) => {
    return MovieService.findAllMovie(title) ?? [];
  }
);

const findMovieById = createAsyncThunk(
  ActionType.FIND_MOVIE_BY_ID,
  async (id: number) => {
    return MovieService.findMovieById(id) ?? null;
  }
);

export { findAllMovie, findMovieById };
