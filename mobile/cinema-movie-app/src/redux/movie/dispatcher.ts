import { createAsyncThunk } from "@reduxjs/toolkit";
import { ActionType } from "./type";
import { MovieService } from "../../services/movie/movie.service";

const findAllMovie = createAsyncThunk(ActionType.FIND_ALL_MOVIE, async (title: string) => {
  return (await MovieService.findAllMovie(title)) ?? [];
});

const findMovieById = createAsyncThunk(ActionType.FIND_MOVIE_BY_ID, async (id: number) => {
  return (await MovieService.findMovieById(id)) ?? null;
});

const findAllGenres = createAsyncThunk(ActionType.FIND_ALL_GENRE, async () => {
  return (await MovieService.findAllGenres()) ?? [];
});

const findAllMovieShowing = createAsyncThunk(ActionType.FIND_MOVIE_BY_SHOWING, async () => {
  return (await MovieService.findAllMovieShowing()) ?? [];
});

const findAllMovieComingSoon = createAsyncThunk(ActionType.FIND_MOVIE_BY_COMING_SOON, async () => {
  return (await MovieService.findAllMovieComingSoon()) ?? [];
});

const findShowtimeByMovieId = createAsyncThunk(ActionType.GET_SHOWTIME_MOVIE_BY_ID, async (id: number) => {
  return (await MovieService.findShowtimeByMovieId(id)) ?? [];
});

const getFiveMovieHighestOfMonth = createAsyncThunk(ActionType.GET_FIVE_MOVIE_HIGHEST_OF_MONTH, async () => {
  return (await MovieService.getFiveMovieHighestOfMonth()) ?? [];
});

const getRateByMovieId = createAsyncThunk(ActionType.GET_RATE_BY_MOVIE_ID, async (id: number) => {
  return await MovieService.getRateByMovieId(id);
});

export {
  findAllMovie,
  findMovieById,
  findAllGenres,
  findAllMovieShowing,
  findAllMovieComingSoon,
  findShowtimeByMovieId,
  getFiveMovieHighestOfMonth,
  getRateByMovieId,
};
