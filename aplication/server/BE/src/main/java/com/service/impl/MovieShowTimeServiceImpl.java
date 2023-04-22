package com.service.impl;

import com.model.entity.Movie;
import com.model.entity.MovieShowTime;
import com.repository.MovieShowTimeRepository;
import com.service.MovieShowTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieShowTimeServiceImpl implements MovieShowTimeService {
    @Autowired
    MovieShowTimeRepository movieShowTimeRepository;

    @Override
    public List<MovieShowTime> findAllMovieShowTimeByMovieId(long movieId) {
        return movieShowTimeRepository.findAllMovieShowTimeByMovieId(movieId);
    }

    @Override
    public MovieShowTime findMovieShowTimeById(long id) {
        return movieShowTimeRepository.findMovieShowTimeById(id);
    }

    @Override
    public List<MovieShowTime> findMovieShowTimeByDate(String date) {
        return movieShowTimeRepository.findMovieShowTimeByDate(date);
    }
}
