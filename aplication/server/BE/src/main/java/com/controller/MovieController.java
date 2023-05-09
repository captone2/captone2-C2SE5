package com.controller;


import com.model.dto.movie.MovieDTO;
import com.service.GenreService;
import com.service.MovieImageService;
import com.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.model.entity.Movie;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/auth/movie")
@CrossOrigin("http://localhost:4200")
public class MovieController {


    @Autowired
    private MovieService movieService;

    @Autowired
    private GenreService genreService;

    @Autowired
    private MovieImageService movieImageService;

    @GetMapping(value = "/getAllMovie")
    public ResponseEntity<Page<Movie>> getAllUser(@RequestParam("page") Integer page,
                                                 @RequestParam("size") Integer size) {
        try {
            Page<Movie> userList = movieService.getAllMovie(page, size);
            return new ResponseEntity<>(userList,HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
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
        List<Movie> movies = movieService.searchMovie(keyword);
        if (movies.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(movies, HttpStatus.OK);
        }
    }

    @PostMapping(value = "/add")
    public ResponseEntity<?> addMovie(@RequestBody MovieDTO movie) {
        Movie movie1 = new Movie(movie.getTitle(),movie.getCast(),movie.getDirector(),movie.getReleaseDate(),movie.getRunningTime(),movie.getProduction(),movie.getTrailerUrl(),movie.getContent());
        Movie movies = movieService.saveMovie(movie1);
        for (int i=0 ;i < movie.getGenre().size();i++) {
            genreService.addGenreToMovie(movie.getGenre().get(i),movies.getId());
        }
        for (int i=0 ;i < movie.getImgUrl().size();i++) {
            movieImageService.addImageByIdMovie(movie.getImgUrl().get(i),movies.getId());
        }
        return new ResponseEntity<>(movies, HttpStatus.OK);
    }
}
