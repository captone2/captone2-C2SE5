import { createAsyncThunk } from "@reduxjs/toolkit";
import { ActionType } from "./type";
import { MovieService } from "../../services/movie/movie.service";

const findAllMovie = createAsyncThunk(
  ActionType.FIND_ALL_MOVIE,
  async (title: string) => {
    return (await MovieService.findAllMovie(title)) ?? [];
  }
);

const findMovieById = createAsyncThunk(
  ActionType.FIND_MOVIE_BY_ID,
  async (id: number) => {
    return (await MovieService.findMovieById(id)) ?? null;
  }
);

const findAllGenres = createAsyncThunk(ActionType.FIND_ALL_GENRE, async () => {
  return (await MovieService.findAllGenres()) ?? null;
});

export { findAllMovie, findMovieById, findAllGenres };
