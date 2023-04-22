package com.service;

import com.model.dto.hue.SearchMovieDTO;

import com.model.entity.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface MovieService {
    //HueHV
    Page<Movie> getAllMovie(Pageable pageable);
    List<Movie> getAllMovie();

    //HueHV
    Page<Movie> listAllMovie(String name, Pageable pageable);
    List<Movie> listAllMovie(String name);

    //HueHV
    List<Movie> searchMovie(SearchMovieDTO searchMovieDTO);

    //HueHV
    Movie findMovieById(long id);

    //HueHV
    Movie getIdMovieByName(String name);

    //HueHV
    void createMovie(String title, LocalDate showing_From, LocalDate showing_To, String cast, String director, LocalDate release_Date, String rated, int running_Time,
                     String production,String trailer_Url, String content, boolean is3D, long account_Id);

    //HueHV
    void updateMovie(String title, LocalDate showing_From, LocalDate showing_To, String cast, String director, LocalDate release_Date, String rated, int running_Time,
                     String production, String trailer_Url, String content, boolean is3D, long account_Id, long id);

    List<Movie> findAllMovieShowing();
    List<Movie> findAllMovieComingSoon(LocalDate today);
    List<Movie> searchMovie(String keyword, LocalDate today);
    List<Movie> listTopFiveMovie();
    List<Movie> findAllMovieShowingAndComingSoon();
    List<Movie> findAllMovieSeenByAccount(long accountId);
}
