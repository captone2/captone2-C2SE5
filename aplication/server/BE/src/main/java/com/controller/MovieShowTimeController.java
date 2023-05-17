package com.controller;


import com.model.entity.Genre;
import com.model.entity.MovieShowTime;
import com.repository.GenreRepository;
import com.repository.MovieShowTimeRepository;
import com.service.MovieShowTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/auth/movie-showtime")
@CrossOrigin(origins = "**")
public class MovieShowTimeController {
    @Autowired
    MovieShowTimeRepository movieShowTimeRepository;
    @Autowired
    MovieShowTimeService movieShowTimeService;
    @Autowired
    GenreRepository genreRepository;

    @GetMapping(value = "/{id}")
    public ResponseEntity<List<MovieShowTime>> getMovieShowTimeByMovieId(@PathVariable("id") long id) {
        List<MovieShowTime> movieShowTimeList = movieShowTimeService.findAllMovieShowTimeByMovieId(id);
        if (movieShowTimeList != null) {
            return new ResponseEntity<>(movieShowTimeList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping(value = "/detail/{id}")
    public ResponseEntity<MovieShowTime> getMovieShowTimeById(@PathVariable("id") long id) {
        MovieShowTime movieShowTime = movieShowTimeService.findMovieShowTimeById(id);
        if (movieShowTime != null) {
            return new ResponseEntity<>(movieShowTime, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping(value = "/date/{date}")
    public ResponseEntity<List<MovieShowTime>> getMovieShowTimeByDate(@PathVariable("date") String date) {
        List<MovieShowTime> movieShowTimes =  movieShowTimeService.findMovieShowTimeByDate(date);
        return new ResponseEntity<>(movieShowTimes, HttpStatus.OK);
        }

    @GetMapping(value = "/year-now")
    public ResponseEntity<List<MovieShowTime>> getMovieShowTimeByYearNow() {
        List<MovieShowTime> movieShowTimes =  movieShowTimeRepository.findMovieShowTimeByYearNow();
        return new ResponseEntity<>(movieShowTimes, HttpStatus.OK);
    }


    @GetMapping(value = "/year-genre/{id}")
    public ResponseEntity<List<MovieShowTime>> getMovieShowTimeByYearGenre(@PathVariable("id") String id) {
        List<MovieShowTime> movieShowTimes =  movieShowTimeRepository.findMovieShowTimeByYearAndGenre(id);
        return new ResponseEntity<>(movieShowTimes, HttpStatus.OK);
    }

    @GetMapping(value = "/genre")
    public ResponseEntity<List<Genre>> getAllGenre() {
        List<Genre> genreList =  genreRepository.findAllGenre();
        return new ResponseEntity<>(genreList, HttpStatus.OK);
    }

    @GetMapping(value = "/now")
    public ResponseEntity<List<MovieShowTime>> getMovieShowTimeNow() {
        List<MovieShowTime> movieShowTimes =  movieShowTimeRepository.findMovieCNowPlaying();
        return new ResponseEntity<>(movieShowTimes, HttpStatus.OK);
    }

    @GetMapping(value = "/now-genre/{id}")
    public ResponseEntity<List<MovieShowTime>> getMovieShowTimeNowByGenre(@PathVariable("id") String id) {
        List<MovieShowTime> movieShowTimes =  movieShowTimeRepository.findMovieShowTimeNow(id);
        return new ResponseEntity<>(movieShowTimes, HttpStatus.OK);
    }
}
