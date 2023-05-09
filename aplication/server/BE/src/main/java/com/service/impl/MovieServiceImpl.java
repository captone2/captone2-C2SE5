package com.service.impl;

import com.model.dto.Hue.SearchMovieDTO;
import com.model.entity.Movie;
import com.repository.MovieRepository;
import com.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.List;

@Service
public class MovieServiceImpl implements MovieService {
    @Autowired
    MovieRepository movieRepository;


    @Override
    public Page<Movie> getAllMovie(Integer page, Integer size) {
        Pageable paging = PageRequest.of(page, size, Sort.by("id").descending());
        return movieRepository.findAll(paging);
    }

    @Override
    public Movie findMovieById(Long id) {
        return movieRepository.findMovieById(id);
    }

    @Override
    public List<Movie> searchMovie(String keyword) {
        return movieRepository.searchMovieByTitle('%'+keyword+'%');
    }

    @Override
    public List<Movie> findAllMovieShowing() {
        return movieRepository.findAllMovieShowing();
    }

    @Override
    public List<Movie> findAllMovieComingSoon() {
        return movieRepository.findAllMovieComingSoon();
    }

    @Override
    public Movie findOneMovieBestSeller() {
        return movieRepository.findOneMovieBestSeller();
    }

    @Override
    public Movie saveMovie(Movie movie) {
        return movieRepository.save(movie);
    }
}
