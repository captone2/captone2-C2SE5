package com.controller;

import com.model.entity.Genre;
import com.service.GenreService;
import com.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.model.entity.Movie;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(value = "api/auth/movie")
@CrossOrigin("http://localhost:4200")
public class MovieController {
    private LocalDate today = LocalDate.now();

    @Autowired
    private GenreService genreService;
    @Autowired
    private MovieService movieService;

    @GetMapping(value = "/getAllMovie")
    public ResponseEntity<List<Genre>> getAllGenre() {
        return ResponseEntity.ok(genreService.findAllGenre());
    }


    @GetMapping(value = "/movie-showing")
    public ResponseEntity<List<Movie>> getMovieShowings() {
        List<Movie> movieShowings = movieService.findAllMovieShowing();
        if (movieShowings.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(movieShowings, HttpStatus.OK);
        }
    }


    @GetMapping(value = "/movie-coming")
    public ResponseEntity<List<Movie>> getMovieComingSoon() {
        List<Movie> movieComingSoons = movieService.findAllMovieComingSoon(today);
        if (movieComingSoons.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(movieComingSoons, HttpStatus.OK);
        }
    }




    @GetMapping(value = "/detail-movie/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable("id") long id) {
        Movie movie = movieService.findMovieById(id);
        if (movie != null) {
            return new ResponseEntity<>(movie, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }


    @GetMapping(value = "/search-movie")
    public ResponseEntity<List<Movie>> searchMovie(@RequestParam("keyword") String keyword) {
        List<Movie> movies = movieService.searchMovie(keyword, today);
        if (movies.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(movies, HttpStatus.OK);
        }
    }


    @GetMapping(value = "/all-movie")
    public ResponseEntity<List<Movie>> findAllMovieShowingAndComingSoon() {
        List<Movie> movies = movieService.findAllMovieShowingAndComingSoon();
        if (movies.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(movies, HttpStatus.OK);
        }
    }
}
