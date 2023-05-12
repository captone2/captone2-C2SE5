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
  return (await MovieService.findAllGenres()) ?? [];
});

const findAllMovieShowing = createAsyncThunk(
  ActionType.FIND_MOVIE_BY_SHOWING,
  async () => {
    return (await MovieService.findAllMovieShowing()) ?? [];
  }
);

const findAllMovieComingSoon = createAsyncThunk(
  ActionType.FIND_MOVIE_BY_COMING_SOON,
  async () => {
    return (await MovieService.findAllMovieComingSoon()) ?? [];
  }
);

const findShowtimeByMovieId = createAsyncThunk(
  ActionType.GET_SHOWTIME_MOVIE_BY_ID,
  async (id: number) => {
    return (await MovieService.findShowtimeByMovieId(id)) ?? [];
  }
);

export {
  findAllMovie,
  findMovieById,
  findAllGenres,
  findAllMovieShowing,
  findAllMovieComingSoon,
  findShowtimeByMovieId,
};
