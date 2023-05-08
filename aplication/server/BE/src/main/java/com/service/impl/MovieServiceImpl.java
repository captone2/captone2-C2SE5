package com.service.impl;

import com.model.dto.Hue.SearchMovieDTO;
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
    public List<Movie> getAllMovie() {
        return movieRepository.findAll();
    }


    @Override
    public List<Movie> findAllMovieShowing() {
        return movieRepository.findAllMovieShowing();
    }

    @Override
    public Movie findMovieById(long id) {
        return movieRepository.findMovieById(id);
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
    public List<Movie> searchMovie(String keyword, LocalDate today) {
        return movieRepository.searchMovie(keyword, today);
    }

    @Override
    public List<Movie> findAllMovieSeenByAccount(long accountId) {
        return movieRepository.findAllMovieSeenByAccount(accountId);
    }

    @Override
    public List<Movie> findAllMovieComingSoon() {
        return movieRepository.findAllMovieComingSoon();
    }

    @Override
    public Movie findOneMovieBestSeller() {
        return movieRepository.findOneMovieBestSeller();
    }
}
