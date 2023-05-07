package com.service;

import com.model.dto.Hue.SearchMovieDTO;

import com.model.entity.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface MovieService {
    //HueHV
    List<Movie> getAllMovie();

    List<Movie> listAllMovie(String name);

    //HueHV
    List<Movie> searchMovie(SearchMovieDTO searchMovieDTO);

    //HueHV
    Movie findMovieById(long id);

    //HueHV
    Movie getIdMovieByName(String name);

    List<Movie> findAllMovieShowing();
    List<Movie> findAllMovieComingSoon(LocalDate today);
    List<Movie> searchMovie(String keyword, LocalDate today);
    List<Movie> findAllMovieShowingAndComingSoon();
    List<Movie> findAllMovieSeenByAccount(long accountId);

    List<Movie> findAllMovieComingSoon();
    Movie findOneMovieBestSeller();
}
