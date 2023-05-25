package com.controller;


import com.model.dto.MovieShowTimeDTO;
import com.model.entity.Genre;
import com.model.entity.MovieShowTime;
import com.model.entity.Showtime;
import com.repository.BookingRepository;
import com.repository.GenreRepository;
import com.repository.MovieShowTimeRepository;
import com.repository.ShowtimeRepository;
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
    MovieShowTimeService movieShowTimeService;
    @Autowired
    MovieShowTimeRepository movieShowTimeRepository;
    @Autowired
    BookingRepository bookingRepository;
    @Autowired
    GenreRepository genreRepository;
    @Autowired
    ShowtimeRepository showtimeRepository;

    @GetMapping(value = "/{id}")
    public ResponseEntity<List<MovieShowTime>> getMovieShowTimeByMovieId(@PathVariable("id") long id) {
        List<MovieShowTime> movieShowTimeList = movieShowTimeService.findAllMovieShowTimeByMovieId(id);
        if (movieShowTimeList != null) {
            return new ResponseEntity<>(movieShowTimeList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping(value = "/getAll")
    public ResponseEntity<List<MovieShowTime>> getAll() {
        List<MovieShowTime> movieShowTimeList = movieShowTimeRepository.findAll();
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
        List<MovieShowTime> movieShowTimes = movieShowTimeService.findMovieShowTimeByDate(date);
        return new ResponseEntity<>(movieShowTimes, HttpStatus.OK);
    }

    @GetMapping(value = "/year-now")
    public ResponseEntity<List<MovieShowTime>> getMovieShowTimeByYearNow() {
        List<MovieShowTime> movieShowTimes = movieShowTimeRepository.findMovieShowTimeByYearNow();
        return new ResponseEntity<>(movieShowTimes, HttpStatus.OK);
    }


    @GetMapping(value = "/year-genre/{id}")
    public ResponseEntity<List<MovieShowTime>> getMovieShowTimeByYearGenre(@PathVariable("id") String id) {
        List<MovieShowTime> movieShowTimes = movieShowTimeRepository.findMovieShowTimeByYearAndGenre(id);
        return new ResponseEntity<>(movieShowTimes, HttpStatus.OK);
    }

    @GetMapping(value = "/genre")
    public ResponseEntity<List<Genre>> getAllGenre() {
        List<Genre> genreList = genreRepository.findAllGenre();
        return new ResponseEntity<>(genreList, HttpStatus.OK);
    }

    @GetMapping(value = "/now")
    public ResponseEntity<List<MovieShowTime>> getMovieShowTimeNow() {
        List<MovieShowTime> movieShowTimes = movieShowTimeRepository.findMovieCNowPlaying();
        return new ResponseEntity<>(movieShowTimes, HttpStatus.OK);
    }

    @GetMapping(value = "/now-genre/{id}")
    public ResponseEntity<List<MovieShowTime>> getMovieShowTimeNowByGenre(@PathVariable("id") String id) {
        List<MovieShowTime> movieShowTimes = movieShowTimeRepository.findMovieShowTimeNow(id);
        return new ResponseEntity<>(movieShowTimes, HttpStatus.OK);
    }


    @GetMapping(value = "/show-time")
    public ResponseEntity<List<Showtime>> getAllMovieShowTime() {
        List<Showtime> showtimes = showtimeRepository.findAll();
        return new ResponseEntity<>(showtimes, HttpStatus.OK);
    }

    @PostMapping(value = "/find-date-screen")
    public ResponseEntity<List<MovieShowTime>> findMovieShowTimeByShowDateAndScreen(@RequestBody MovieShowTimeDTO movieShowTimeDTO) {
        List<MovieShowTime> movieShowTimes = movieShowTimeRepository.findMovieShowTimeByShowDateAndScreen(movieShowTimeDTO.getMovieId(), movieShowTimeDTO.getShowDate(), movieShowTimeDTO.getScreenId());
        return new ResponseEntity<>(movieShowTimes, HttpStatus.OK);
    }

    @PostMapping(value = "/add")
    public ResponseEntity<?> addMovieShowTime(@RequestBody MovieShowTimeDTO movieShowTimeDTO) {
        for (int i = 0; i < movieShowTimeDTO.getShowTime().length; i++) {
            movieShowTimeRepository.addMovieShowtime(movieShowTimeDTO.getShowDate(), movieShowTimeDTO.getMovieId(), movieShowTimeDTO.getScreenId(), movieShowTimeDTO.getShowTime()[i]);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
