package com.controller;


import com.model.dto.movie.MovieDTO;
import com.repository.MovieImageRepository;
import com.repository.MovieRepository;
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
@CrossOrigin("**")
public class MovieController {


    @Autowired
    private MovieService movieService;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private MovieImageRepository movieImageRepository;

    @Autowired
    private GenreService genreService;

    @Autowired
    private MovieImageService movieImageService;

    @GetMapping(value = "/getAllMovie")
    public ResponseEntity<Page<Movie>> getAllMovie(@RequestParam("page") Integer page,
                                                   @RequestParam("size") Integer size) {
        try {
            Page<Movie> movieList = movieService.getAllMovie(page, size);
            return new ResponseEntity<>(movieList,HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/getAll")
    public ResponseEntity<List<Movie>> getAll() {
        try {
            List<Movie> movies = movieRepository.findAll();
            return new ResponseEntity<>(movies,HttpStatus.OK);
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

    @GetMapping("/movie-coming-soon")
    public ResponseEntity<List<Movie>> findAllMovieComingSoon() {
        List<Movie> movieComingSoon = movieService.findAllMovieComingSoon();
        if (movieComingSoon.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(movieComingSoon, HttpStatus.OK);
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
        MovieDTO movieDTO = movie;
        Movie movie1 = new Movie(movie.getTitle(),movie.getCast(),movie.getDirector(),movie.getReleaseDate(),movie.getRunningTime(),movie.getProduction(),movie.getTrailerUrl(),movie.getContent());
        Movie movies = movieService.saveMovie(movie1);
        List<Integer> gernes = movie.getGenre();
        for (int i=0 ;i < gernes.size();i++) {

            genreService.addGenreToMovie(gernes.get(i),movies.getId());
        }
        movieImageService.addImageByIdMovie(movie.getImgUrl(),movies.getId());
        return new ResponseEntity<>(movies, HttpStatus.OK);
    }


    @PostMapping(value = "/update")
    public ResponseEntity<?> updateMovie(@RequestBody MovieDTO movie) {
        MovieDTO movieDTO = movie;
        Movie movie1 = new Movie(movie.getId(),movie.getTitle(),movie.getCast(),movie.getDirector(),movie.getReleaseDate(),movie.getRunningTime(),movie.getProduction(),movie.getTrailerUrl(),movie.getContent());
        Movie movies = movieService.saveMovie(movie1);
        List<Integer> genres = movie.getGenre();
        List<Integer> genreByMovieId = movieImageRepository.getGenreByMovieId(movies.getId());


        for (int i=0 ;i < genres.size();i++) {
            for (int j=0 ;j < genreByMovieId.size();j++) {
                if(genres.get(i) == genreByMovieId.get(j)) {
                    genres.remove(i);
                    genreByMovieId.remove(j);
                    i--;
                    break;
                } else {
                    if (j == genreByMovieId.size()-1) {
                        genreService.addGenreToMovie(genres.get(i),movies.getId());
                        genres.remove(i);
                        i--;
                    }
                }
            }

        }

        if (genreByMovieId.size() >0) {
            for (int j=0 ;j < genreByMovieId.size();j++) {

                System.out.println(genreByMovieId.get(j));
                System.out.println(movie.getId());
                movieImageRepository.deleteGenreMovie(genreByMovieId.get(j),movie.getId());
            }
        }



        movieImageRepository.updateImage(movie.getImgUrl(),movies.getId());
        return new ResponseEntity<>(movies, HttpStatus.OK);
    }

}