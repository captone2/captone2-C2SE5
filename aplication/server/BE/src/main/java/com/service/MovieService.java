package com.service;

import com.model.entity.Movie;
import org.springframework.data.domain.Page;

import java.util.List;

public interface MovieService {
    Page<Movie> getAllMovie(Integer page, Integer size);
    Movie findMovieById(Long id);
    List<Movie> searchMovie(String keyword);


    List<Movie> findAllMovieShowing();
    List<Movie> findAllMovieComingSoon();
    Movie findOneMovieBestSeller();
}
