package com.service;

import com.model.entity.Movie;
import com.model.entity.MovieShowTime;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MovieShowTimeService {
    List<MovieShowTime> findAllMovieShowTimeByMovieId(long movieId);

    MovieShowTime findMovieShowTimeById(long id);

    List<MovieShowTime> findMovieShowTimeByDate(String date);
}
