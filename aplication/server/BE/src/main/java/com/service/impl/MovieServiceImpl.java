package com.service.impl;

import com.model.dto.hue.SearchMovieDTO;
import com.model.entity.Movie;
import com.repository.MovieRepository;
import com.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.List;

@Service
public class MovieServiceImpl implements MovieService {
    @Autowired
    MovieRepository movieRepository;

    float daysBetweenBySearch = 0; //bien dem ngay sau khi search theo date or room
    SimpleDateFormat myDateFormat = new SimpleDateFormat("yyyy-MM-dd");

    @Override
    public Page<Movie> getAllMovie(Pageable pageable) {
        return movieRepository.findAllMovie(pageable);
    }

    @Override
    public List<Movie> getAllMovie() {
        return movieRepository.findAll();
    }

    //TuHC - lay phim dang chieu
    @Override
    public List<Movie> findAllMovieShowing() {
        return movieRepository.findAllMovieShowing();
    }

    //TuHC - lay phim sap chieu
    @Override
    public List<Movie> findAllMovieComingSoon(LocalDate today) {
        return movieRepository.findAllMovieComingSoon(today);
    }

    //TuHc - lay phim theo id
    @Override
    public Movie findMovieById(long id) {
        return movieRepository.findMovieById(id);
    }

    @Override
    public Page<Movie> listAllMovie(String name, Pageable pageable) {
        return movieRepository.listAllMovie(name, pageable);
    }

    @Override
    public List<Movie> listAllMovie(String name) {
        return movieRepository.listAllMovie(name);
    }

    @Override
    public List<Movie> searchMovie(SearchMovieDTO searchMovieDTO) {
        System.out.println(searchMovieDTO.isIs3D());
        if (searchMovieDTO.getTitle() == null){
            searchMovieDTO.setTitle("");
        }
        if (searchMovieDTO.getProduction() == null){
            searchMovieDTO.setProduction("");
        }
        if (searchMovieDTO.getReleaseDate() == null) {
            searchMovieDTO.setReleaseDate("");
        }

        return movieRepository.searchMovie(searchMovieDTO.getTitle(), searchMovieDTO.getProduction(),
                searchMovieDTO.getReleaseDate(), searchMovieDTO.isIs3D());
    }

    @Override
    public Movie getIdMovieByName(String name){
        return movieRepository.getIdMovieByName(name);
    }

    @Override
    public void createMovie(String title, LocalDate showing_From, LocalDate showing_To, String cast, String director, LocalDate release_Date, String rated, int running_Time,
                            String production,String trailer_Url, String content, boolean is3D, long account_Id) {
        movieRepository.createMovie(title, showing_From, showing_To, cast, director, release_Date, rated, running_Time, production, trailer_Url, content, is3D, account_Id);
    }

    @Override
    public void updateMovie(String title, LocalDate showing_From, LocalDate showing_To, String cast, String director, LocalDate release_Date, String rated, int running_Time,
                            String production, String trailer_Url, String content, boolean is3D, long account_Id, long id) {
        movieRepository.updateMovie(title, showing_From, showing_To, cast, director, release_Date, rated, running_Time, production, trailer_Url, content, is3D, account_Id, id);
    }
    //TuHC - tim kiem phim
    @Override
    public List<Movie> searchMovie(String keyword, LocalDate today) {
        return movieRepository.searchMovie(keyword, today);
    }

    //TuHC - lay top 5 phim
    @Override
    public List<Movie> listTopFiveMovie() {
        return movieRepository.listTopFiveMovie();
    }

    //TuHC - lay phim dang chieu va sap chieu
    @Override
    public List<Movie> findAllMovieShowingAndComingSoon() {
        return movieRepository.findAllMovieShowingAndComingSoon();
    }

    @Override
    public List<Movie> findAllMovieSeenByAccount(long accountId) {
        return movieRepository.findAllMovieSeenByAccount(accountId);
    }
}
